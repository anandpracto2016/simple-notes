let join = require('path').join;
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let parseArr = require('./helpers').parseArr;
let paths = require('./config').paths;

let fileLoader = (isProd) => ({
  test: /\.(jpe?g|png|gif|svg|woff2?|ico|ttf|eot|json)$/i,
  use: [{
    loader: 'file-loader',
    options: {
      context: join(process.cwd(), paths.assets.root),
      name: isProd ? '[path][name].[hash:12].[ext]' : '[path][name].[ext]'
    }
  }]
});

let ejsLoader = () => ({
  test: /\.ejs$/,
  use: [{
    loader: 'ejs-compiled-loader'
  }]
});

let babelLoader = () => ({
  test: /\.jsx?$/,
  include: join(process.cwd(), paths.client.root),
  use: [{
    loader: 'babel-loader'
  }]
});

let cssLoader = (isProd) => ({
  loader: 'css-loader',
  options: {
    url: false,
    importLoaders: isProd ? 1 : 0
  }
});

let postCssLoader = () => ({
  loader: 'postcss-loader',
  options: {
    plugins: () => {
      return [
        require('autoprefixer')({
          browsers: '> 5%'
        })
      ]}
  }
});

let hotLoader = (isProd) => !isProd && {
  // loader: 'react-hot-loader/webpack'
}

let sassLoader = () => 'sass-loader';

let extractPluginLoader = (isProd) => ({
  test: /\.s?css$/,
  use: ExtractTextPlugin.extract({
    use: parseArr([ cssLoader, postCssLoader, sassLoader ])(isProd)
  })
});

module.exports = parseArr([
  hotLoader,
  fileLoader,
  ejsLoader,
  babelLoader,
  extractPluginLoader
])

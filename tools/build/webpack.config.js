let config = require('./config');

let loaders = require('./loaders');
let plugins = require('./plugins');

let paths = config.paths;
let join = require('path').join;
let stats = require('./stats');
let curDir = process.cwd();
let clientEntry = join(curDir, paths.client.entry_script);

module.exports = (env) => {
  let isProd = !!env && env.production;

  return {
    context: process.cwd(),
    devServer: {
      contentBase: join(curDir, "build"),
      compress: true,
      disableHostCheck: true,
      port: 3000,
      historyApiFallback: true,
      proxy: {
        '/partners/purchase-flow/entities/images': {
          target: 'http://localhost:8081',
          pathRewrite: {'/entities/': '/assets/'}
        }
      }
    },
    watch: !isProd && true,
    entry: {
      client: clientEntry,
      main: join(curDir, paths.client.main_style)
    },
    output: {
      path: join(curDir, paths.output.root),
      filename: join(paths.output.scripts, isProd ? '[name].[chunkhash:12].js' : '[name].js'),
      publicPath: config.public_path
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json' ]
    },
    devtool: isProd ? 'source-map' : 'eval',
    stats: stats,
    module: {
      rules: loaders(isProd)
    },
    plugins: plugins(isProd)
  }
}

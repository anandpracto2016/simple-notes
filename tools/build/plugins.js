let join = require('path').join;
let webpack = require('webpack');

let ExtractTextPlugin = require('extract-text-webpack-plugin');
let ManifestRevisionPlugin = require('manifest-revision-webpack-plugin');
let manifestFormatter = require('@practo/manifest-revision-formatter-webpack');
let RevReplacePlugin = require('@practo/rev-replace-plugin');
let BuildMessagePlugin = require('@practo/build-message-webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let WriteFilePlugin   = require('write-file-webpack-plugin');
let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let parseArr = require('./helpers').parseArr;
let config = require('./config');
let paths = config.paths;

let outputRoot = join(process.cwd(), paths.output.root);

/* Create a util to manage adding of hash into filenames based on ENV */

let extractVendor = (isProd) =>
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: (module) => {
      if(module.context && module.context.indexOf('node_modules') !== -1)
        return true;

      return false;
    },
    filename: join(paths.output.scripts, isProd ? '[name].[chunkhash:12].js' : '[name].js')
  });

let extractText = (isProd) =>
  new ExtractTextPlugin({
    filename: join(paths.output.styles, isProd ? '[name].[contenthash:12].css' : '[name].css')
  });

let ignoreModules = () =>
  new webpack.IgnorePlugin(/(\.\/(config|locale))$/, /moment$/);

let loaderOptions = (isProd) =>
  !isProd && new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  });

let uglifyJs = (isProd) =>
  isProd && new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    compress: {
      drop_console: true,
      screw_ie8: true,
      conditionals: true,
      unused: true,
      comparisons: true,
      dead_code: true,
      if_return: true,
      join_vars: true,
      warnings: false
    },
    output: {
      comments: false
    }
  });

let definePlugin = (isProd) =>
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    'process.env.BROWSER': JSON.stringify('true'),
    'process.env.API_HOST': JSON.stringify(process.env.API_HOST),
    'process.env.COMMIT_HASH': JSON.stringify(process.env.COMMIT_HASH)
  });

let manifestRevision = () => {
  return new ManifestRevisionPlugin(join(outputRoot, 'manifest.json'), {
    rootAssetPath: './public',
    ignorePaths: [],
    format: manifestFormatter
  });
}

let revReplace = () =>
  new RevReplacePlugin({
    manifest: join(outputRoot, 'manifest.json'),
    output: outputRoot,
    revision_scripts: true
  });

let buildMessage = () =>
  new BuildMessagePlugin({
    message: 'Starting build ... '
  });

let hotPlugin = (isProd) => !isProd && new webpack.HotModuleReplacementPlugin();

let namedModulesPlugin = (isProd) => !isProd && new webpack.NamedModulesPlugin();

let htmlPlugin = (isProd) =>
  new HtmlWebpackPlugin({
    template: 'src/index.ejs',
    inject: true,
    prod: !!isProd
  });

let WriteFile = (isProd) => !isProd && new WriteFilePlugin({
  test: /\.css?$/,
  useHashIndex: false
});

let bundleAnalyzerPlugin = () => {
  return false && new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    reportFilename: 'report.html',
    defaultSizes: 'parsed',
    openAnalyzer: true,
    generateStatsFile: false,
    statsFilename: 'stats.json',
    statsOptions: null,
    logLevel: 'info'
  })
}

let plugins = [
  extractVendor,
  htmlPlugin,
  extractText,
  ignoreModules,
  loaderOptions,
  definePlugin,
  uglifyJs,
  manifestRevision,
  revReplace,
  buildMessage,
  WriteFile,
  hotPlugin,
  namedModulesPlugin,
  bundleAnalyzerPlugin
];

module.exports = parseArr(plugins);

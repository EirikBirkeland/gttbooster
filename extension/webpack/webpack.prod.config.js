const webpack = require('webpack')

const base = require('./webpack.common.config')
const mergeDeep = require('merge-deep')
const WebpackShellPlugin = require('webpack-shell-plugin')

const uglifyConfig = { // Uglifyjs sometimes breaks UTF-8?
   sourceMap: false,
   mangle: true,
   output: {
      beautify: false,
      ascii_only: true
   },
   comments: false,
   compress: {
      unused: true,
      dead_code: true, // Big one--strip code that will never execute
      warnings: false, // Good for prod apps so users can't peek behind curtain
      drop_debugger: true,
      conditionals: true,
      evaluate: true,
      drop_console: true, // Strips console statements
      sequences: true,
      booleans: true
   }
}

module.exports = mergeDeep(base, {
   plugins: [
      new WebpackShellPlugin({
         onBuildStart: ['echo Starting BUILD'],
         onBuildEnd: ['bin/npm-build.sh && echo "Executed npm-build.sh"']
      }),
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.optimize.UglifyJsPlugin(uglifyConfig),
      new webpack.DefinePlugin({
         'process.env.NODE_ENV': '"production"'
      }),
      new BundleAnalyzerPlugin({
         // Can be `server`, `static` or `disabled`.
         // In `server` mode analyzer will start HTTP server to show bundle report.
         // In `static` mode single HTML file with bundle report will be generated.
         // In `disabled` mode you can use this plugin to just generate Webpack Stats JSON file by setting `generateStatsFile` to `true`.
         analyzerMode: 'server',
         // Host that will be used in `server` mode to start HTTP server. Put the actual IP if you need access from other computers, or localhost if you want local host only.
         analyzerHost: '10.0.0.5',
         // Port that will be used in `server` mode to start HTTP server.
         analyzerPort: 8888,
         // Path to bundle report file that will be generated in `static` mode.
         // Relative to bundles output directory.
         reportFilename: 'report.html',
         // Module sizes to show in report by default.
         // Should be one of `stat`, `parsed` or `gzip`.
         // See "Definitions" section for more information.
         defaultSizes: 'parsed',
         // Automatically open report in default browser
         openAnalyzer: false,
         // If `true`, Webpack Stats JSON file will be generated in bundles output directory
         generateStatsFile: false,
         // Name of Webpack Stats JSON file that will be generated if `generateStatsFile` is `true`.
         // Relative to bundles output directory.
         statsFilename: 'stats.json',
         // Options for `stats.toJson()` method.
         // For example you can exclude sources of your modules from stats file with `source: false` option.
         // See more options here: https://github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
         statsOptions: null,
         // Log level. Can be 'info', 'warn', 'error' or 'silent'.
         logLevel: 'info'
      })
   ],
   devtool: 'source-map'
})

const base = require('./webpack.common.config.js')
const mergeDeep = require('merge-deep')
const WebpackShellPlugin = require('webpack-shell-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = mergeDeep(base, {
   output: {
      sourceMapFilename: '[file].map'
   },
   plugins: [
      new WebpackShellPlugin({
         onBuildStart: ['echo "Starting DEV"', /*'philipsHue.sh --number 4 --color red'*/ ],
         onBuildExit: ['bin/npm-start.sh']
      }),
      new BundleAnalyzerPlugin({
         // Can be `server`, `static` or `disabled`.
         // In `server` mode analyzer will start HTTP server to show bundle report.
         // In `static` mode single HTML file with bundle report will be generated.
         // In `disabled` mode you can use this plugin to just generate Webpack Stats JSON file by setting `generateStatsFile` to `true`.
         analyzerMode: 'server',
         // Host that will be used in `server` mode to start HTTP server. Put the actual IP if you need access from other computers, or localhost if you want local host only.
         analyzerHost: 'localhost',
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
   watch: true,
   devtool: 'source-map'
})

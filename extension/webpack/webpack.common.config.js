const path = require('path')
const webpack = require('webpack')

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

module.exports = {
   // Replace entry file as needed
   entry: {
      bundle: './src/app.js',
      options: './src/options/options-index.js',
      background: './src/background/background.js'
   },
   node: {
      __filename: true,
      __dirname: true
   },
   output: {
      path: path.join(process.cwd(), 'dist'),
      filename: '[name].js'
   },
   resolve: {
      // Can i use these aliases with Webpack properly?
      alias: {
         '@app': path.resolve(__dirname, 'src/'),
         '@wb': path.resolve(__dirname, 'src/workbench'),
         '@opt': path.resolve(__dirname, 'src/options'),
         '@bg': path.resolve(__dirname, 'src/options'),
         '@model': path.resolve(__dirname, 'src/model')
      }
   },
   externals: {
      // Require("jquery") is external and available
      //  on the global var jQuery
      jquery: 'jQuery',
      lodash: '_',
      react: 'React',
      'react-dom': 'ReactDOM',
      // Make sure to exclude cheerio from extension bundle:
      cheerio: 'cheerio',
      chalk: 'chalk',
      // For Tabletop!
      request: 'request'
   },
   plugins: [
      new ProgressBarPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
         name: 'commons',
         // (the commons chunk name)

         filename: 'commons.js',
         // (the filename of the commons chunk)

         minChunks: 2,
         // (Modules must be shared between 3 entries)

         // chunks: ["pageA", "pageB"],
         // (Only use these entries)
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
   module: {
      rules: [
         {
            test: /\.js$/,
            exclude: [/node_modules\/localforage/, /__tests__/],
            use: ['cache-loader',
               {
                  loader: 'babel-loader',
                  options: {
                     presets: ['env'],
                     plugins: [
                        'transform-react-jsx',
                        'transform-flow-comments',
                        'transform-class-properties',
                        'transform-function-bind'
                     ]
                  }

               }]
         },
         {
            test: /\.css$/,
            use: [
               {loader: 'style-loader'},
               {
                  loader: 'css-loader',
                  options: {minimize: true}
               }
            ]
         },
         {
            test: /\.less$/,
            exclude: [/node_modules/, /__tests__/],
            use: [
               {loader: 'style-loader'},
               {loader: 'css-loader'},
               {loader: 'less-loader'}
            ]
         },
         {
            test: /\.(png|woff|woff2|eot|ttf|svg)$/,
            use: [{
               loader: 'url-loader',
               options: {
                  limit: 100000
               }
            }]
         }
      ]
   },
   watchOptions: {
      poll: 100
   },
   cache: true
}

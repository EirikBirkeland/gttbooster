const path = require('path')
const webpack = require('webpack')
const appRoot = path.join(__dirname, '/../src/');

const ProgressBarPlugin = require('progress-bar-webpack-plugin')

module.exports = {
  // Replace entry file as needed
  context: appRoot,
  entry: {
    bundle: path.join(appRoot + '/app.js'),
    options: path.join(appRoot + '/options/options-index.js'),
    background: path.join(appRoot + '/background/background.js'),
    popup: path.join(appRoot + '../html/popup.js'),
  },
  node: {
    __filename: true,
    __dirname: true
  },
  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: '[name].js'
  },
  externals: {
    // Require("jquery") is external and available
    //  on the global var jQuery
    jquery: 'jQuery',
    lodash: '_',
    // Make sure to exclude cheerio from extension bundle:
    cheerio: 'cheerio',
    chalk: 'chalk',
    // To prevent Tabletop from pulling `request`
    request: 'request'
  },
  plugins: [
    new ProgressBarPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      filename: 'commons.js',
      minChunks: 2,
    }),

  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, /__tests__/],
        use: ['cache-loader',
          {
            loader: 'babel-loader?cacheDirectory=true',
            options: {
              presets: ['env'],
              plugins: [
                'transform-react-jsx',
                'transform-flow-comments',
                'transform-class-properties',
                'transform-function-bind'
              ]
            }

          }
        ]
      },
      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader'
        },
        {
          loader: 'css-loader',
          options: {
            minimize: true
          }
        }
        ]
      },
      {
        test: /\.less$/,
        exclude: [/node_modules/, /__tests__/],
        use: [{
          loader: 'style-loader'
        },
        {
          loader: 'css-loader'
        },
        {
          loader: 'less-loader'
        }
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

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
    })
  ],
  devtool: 'source-map'
})

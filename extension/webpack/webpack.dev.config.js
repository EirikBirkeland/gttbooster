const base = require('./webpack.common.config.js')
const mergeDeep = require('merge-deep')
const WebpackShellPlugin = require('webpack-shell-plugin')

module.exports = mergeDeep(base, {
  output: {
    sourceMapFilename: '[file].map'
  },
  plugins: [
    new WebpackShellPlugin({
      onBuildStart: ['echo "Starting DEV"'/*, 'which philipsHue.sh && philipsHue.sh --number 4 --color red'*/],
      onBuildExit: ['bin/npm-start.sh']
})
  ],
  watch: true,
  devtool: 'source-map'
})
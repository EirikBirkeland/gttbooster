const base = require('./webpack.common.config.js')
const mergeDeep = require('merge-deep')
const WebpackShellPlugin = require('webpack-shell-plugin')

module.exports = mergeDeep(base, {
   output: {
      sourceMapFilename: '[file].map'
   },
   plugins: [
      new WebpackShellPlugin({
         onBuildStart: ['echo "Starting CircleCi build"'],
         onBuildExit: ['echo "done"', "npm run test"]
      })
   ],
   watch: true,
   devtool: 'source-map'
})
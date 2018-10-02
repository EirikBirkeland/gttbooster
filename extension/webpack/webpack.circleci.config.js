const base = require('./webpack.common.config.js')
const mergeDeep = require('merge-deep')
const WebpackShellPlugin = require('webpack-shell-plugin')

module.exports = mergeDeep(base, {
   output: {
      sourceMapFilename: '[file].map'
   },
   plugins: [
      new WebpackShellPlugin({
         onBuildStart: ['echo "Starting CircleCI build"'],
         onBuildExit: ['echo "Finished CircleCI build"', "prepare_archive.sh"]
      })
   ]
})
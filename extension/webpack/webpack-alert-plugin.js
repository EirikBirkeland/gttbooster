const exec = require('child_process').exec

function NotifyDesktopOnError(options) {
  // Setup the plugin instance with options...
}

NotifyDesktopOnError.prototype.apply = function (compiler) {
  compiler.plugin('done', stats => {
    if (stats.compilation.errors.length > 0) {
      exec('curl 10.0.0.2:3000', stdout => {
        // Who caresdout)=>{
        // who cares
      })
    }
  })
}

module.exports = NotifyDesktopOnError

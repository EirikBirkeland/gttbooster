import $ from 'jquery'

/**
 * The following function isn't technically an observer, but it doesn't matter? (I might rename these things later)
 */
function _listenForUserInput (cb) {
   $(window.cth.dom.targetDoc).bind('keyup', cb)
}

_listenForUserInput.stop = function () {
   $(window.cth.dom.targetDoc).unbind('keyup')
}

export default _listenForUserInput

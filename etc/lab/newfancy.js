// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 2016/01/03.
 */
(function (cth, win) {
    'use strict'

    // Parses the GTT config "properly". From QM manager.
    getGTTConfig = function() {
        var gttConfig
        gttConfig = void 0
        $('script').each(function() {
            var end, src, start
            start = this.text.indexOf('var config')
            if (-1 < start) {
                end = this.text.indexOf('gtc.app.Workbench.init')
                src = this.text.slice(start, end)
                eval(src) // TODO: Is it _ever_ OK to use eval?
                gttConfig = config
                return console.info('Loaded GTT config')
            }
        })
        return gttConfig
    }

})(window.cth, window)
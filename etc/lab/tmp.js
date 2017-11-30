// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 2015/11/20.
 */
(function (cth, win) {
    'use strict'

    //TODO: Simulate click on Comments button 10 secs after loading:
    document.getElementById('\:1p')

    function testKeyDown() {
        $('#transarea').find('iframe').contents().keydown(function (e) {
            if (e.keyCode == 67 && e.ctrlKey && e.shiftKey) {
                alert('yay')
            }
        })
    }

})(window.cth, window)
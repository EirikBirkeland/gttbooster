// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 08.09.2016.
 */

import $ from 'jquery'
import _ from 'lodash'

import initCustomPlaceholderInsertion from './lib/moveCursorForPlaceholders'
import source from './lib/source'
import select from './lib/select'

const debug = require('cth-debug')(__filename.replace(/^src\//, ''))

const DOM = {
    get $TARGET_NODE () { return $(window.cth.dom.targetDoc).find('#transEditor') }
}

function _configure () {
    $.widget('app.autocomplete', $.ui.autocomplete, {

        /*
         * The _renderItem() method is responsible for rendering each
         * menu item in the autocomplete menu.
         */
        _renderItem (ul, item) {
            debug.log('item: ', item)

            // We want the rendered menu item generated by the default implementation.
            const result = this._super(ul, item)

            /*
             * If there is logo data, add our custom CSS class, and the specific
             * logo URL.
             */

            const colorToBootstrap = {
                "grey": 'default',
                "darkblue": 'primary',
                "blue": 'info',
                "green": 'success',
                "orange": 'warning',
                "red": 'danger'
            }

            const span = $('<span/>').addClass('bootstrap-wrapper').append($('<span/>').css({'margin-right': '2px'}).addClass(`label label-${colorToBootstrap[item.color]}`).html(item.type))

            result.find('div').prepend(span)

            return result
        }

    })
}

function _activate (minLength) {
    DOM.$TARGET_NODE.autocomplete({
        minLength: minLength,
        multiple: true,
        autoFocus: true,
        delay: 50,
        source,
        focus () {
            // Prevent value from beng inserted on focus
            return false
        },
        select // SelectFnNew
    })

    DOM.$TARGET_NODE[0].addEventListener('keydown', ({keyCode}) => {
        const LEFT_ARROW_KEY_CODE = 37
        const RIGHT_ARROW_KEY_CODE = 39
        if (keyCode === LEFT_ARROW_KEY_CODE || keyCode === RIGHT_ARROW_KEY_CODE) {
            debug.log('CLOSING')

            _.defer(() => {
                const $node = this.$TARGET_NODE
                $node.autocomplete()
                $node.autocomplete('close')
            })
        }
    })
}

const Autocomplete = {
    init: (tmOpts) => {
        const minLength = window.cth.option.autocompleteMinLength.length
            ? window.cth.option.autocompleteMinLength[1]
            : 2

        _configure()

        // TODO: Custom HTML select: https://jqueryui.com/autocomplete/#custom-data
        const delay = 5000

        if (DOM.$TARGET_NODE.length) {
            _activate(minLength)
            initCustomPlaceholderInsertion()
        } else {
            debug.log(`The translation editor was not available. Trying again in ${delay / 1000} seconds`)
            setTimeout(Autocomplete.init, delay)
        }
    },
    destroy: () => {
        const $node = DOM.$TARGET_NODE
        $node.autocomplete() // prevents unnecessary error msg: "cannot call methods on autocomplete prior to initialization; attempted to call method 'destroy'"
        $node.autocomplete('destroy')
    }
}

export default Autocomplete
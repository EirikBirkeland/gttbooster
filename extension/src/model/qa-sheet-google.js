/*
 * @flow
 * Copyright © 2016 Eirik Birkeland. All rights reserved.
 */

import escapeHtml from 'escape-html'

const _ = require('lodash')
const Tabletop = require('../../vendor/tabletop/tabletop.js')
const debug = require('cth-debug')(__filename.replace(/^src\//, ''))

export class Sheet {
    url: string

    sheetnameToFetch: string

    retrievedSheetNames: Array<string> | null

    onValidationError: Function

    onError: Function

    debug: boolean

    Tabletop: Function

    data: Object | null
    data = null
    messages = {
        "headerError": 'There is an error in the spreadsheet column header.',
        "unreachable": 'The provided optional spreadsheet URL may not be valid. No valid resource could be fetched.',
        "noData": 'No data found. You need to first fetch a sheet.',
        "noDataToValidate": 'No spreadsheet available to validate! Fetch one first.',
        "urlNotInitialized": 'You need to provide a URL when initializing!',
        "sheetMissing": 'The provided optional spreadsheet URL is valid, but the sheet you have specified could not be found. Please go to the options screen and confirm that you have provided a valid sheet name.'
    }
    httpErrors = {
        "400": '<b>400 Bad Request</b> – The network request was malformed. Are you sure the provided URL leads to a valid public spreadsheet?',
        "403": '<b>403 Forbidden</b> – Your request to view the public version of the spreadsheet was rejected by Google\'s servers. Please ensure that you have made your spreadsheet public. For guidance, please see <a href=\'https://base.gtt-booster.com/custom%20qa/custom_qa_checks\' target=\'_blank\'>the custom qa article</a>.',
        "404": '<b>404 Not Found</b> – The provided spreadsheet URL is not a valid Internet resource. Please ensure that there are no typos in your URL!'
    }

    /**
     *
     * @param {Object} opts
     * @param {string} opts.url - the url to a spreadsheet
     * @param {string} opts.sheetname - the name of a particular sheet / tab
     * @param {Function} opts.onValidationError - a callback to execute if a validation error occurs
     * @param {Function} opts.onError - a callback to execute if error occurs.
     * @param {Function} opts.TabletopReplacement
     */
    constructor (opts: Object) {
        const {url, sheetname, onValidationError, onError, debug, tabletopMock} = opts

        this.url = url
        this.sheetnameToFetch = sheetname
        this.onValidationError = onValidationError
        this.onError = onError
        this.debug = debug || false
        this.Tabletop = tabletopMock || Tabletop

        this._processTheUrl()
    }

    fetch (cb: Function) {
        this.Tabletop.init({
            "key": this.url,
            "sheetId": 1,
            "callback": (err, resData) => {
                debug.log('Err: ', err)

                debug.log('Fetched data: ', resData)

                this.retrievedSheetNames = resData ? Object.keys(resData) : null

                debug.log(this.retrievedSheetNames)

                if (!resData) {
                    this.onError(this.messages.noData)
                } else if (!resData[this.sheetnameToFetch]) {
                    this.onError(this.messages.sheetMissing)
                } else {
                    const data: Object = this._filter(this.sheetnameToFetch, resData)
                    this.data = data
                    this._validate(data)
                }

                debug.log('res', resData)

                return cb(err, resData, this.retrievedSheetNames)
            },
            "simpleSheet": false,
            "debug": this.debug
        })
    }

    _processTheUrl (): void {
        if (!this.url) {
            return this.onError(this.messages.urlNotInitialized)
        }

        const publicSpreadsheetUrl = this.url
        if (publicSpreadsheetUrl && publicSpreadsheetUrl.match(/(?:\/edit#gid=[0-9]+|\/pubhtml)$/)) {
            this.url = publicSpreadsheetUrl.replace(/\/edit#gid=[0-9]+$/, '/pubhtml')
        }
    }

    _filter (sheetnameToFetch: string, data: Object): Object {
        _.forEach(data[sheetnameToFetch].elements, (ele, i, arr) => {
            if (arr[i].correction) {
                arr[i].correction = escapeHtml(arr[i].correction)
            } else if(arr[i].message) { // for backwards spreadsheet compatibility ...
                arr[i].message = escapeHtml(arr[i].message)
            }
        })

        // Filter out those items that are "ON"
        return data[sheetnameToFetch].elements.filter((ele) => ele.toggle === 'on')
    }

    _validate (data: Object): void {
        if (!data || !data.length) {
            return this.onError(this.messages.noDataToValidate)
        }

        const validKeys = [
            'priority',
            'products',
            'source_pattern',
            'target_pattern',
            'correction',
            'toggle',
            'special',
            'case_sensitive',
            'match_type',
            'comment'
        ]

        const sheetKeys = Object.keys(data[0])

        for (let i = 0; i < validKeys.length; i++) {
            if (!sheetKeys.includes(validKeys[i])) {
                return this.onValidationError(`${this.messages.headerError}\nColumns ${_.difference(validKeys, sheetKeys).join(' ')} are missing or contain a typo.`)
            }
        }
    }
}
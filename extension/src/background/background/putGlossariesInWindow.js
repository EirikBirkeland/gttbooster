/*
 * TODO: Add a reactive layout, which changes the contents according to what's most appropriate -- e.g. removing descriptions when made small.
 * TODO: Allow for sorting according to these criteria:
 * 1. Alphabetically.
 * 2. Custom sorting according to product name as selected by user, with persistence!
 * E.g. if product is "Docs", then let's assume "Gmail" is considered relevant. But sometimes they might include some random other glossaries which are not useful. The user should be able to select listing order for each products. So e.g.:
 * Docs: Gmail, YouTube
 * AdWords: AdSense, AdGrants, etc.
 */

/*
 * HOWTO reorder elements in DOM: http://jsfiddle.net/vexw5/6/
 * or I could just use arrays in React
 */

import $ from 'jquery';
import persistFontSize from './putGlossariesInWindow/persistFontSize';
import {getBody, getHead} from './putGlossariesInWindow/htmlHeadBody';
import hideDefinitionsStuff from './putGlossariesInWindow/hideDefinitionsStuff';
import removeAndUpdateDatastore from './putGlossariesInWindow/removeAndUpdateDatastore';

const debug = require('cth-debug')(__filename);

function putGlossariesInWindow (content) {
    let wind;
    
    if (!wind) {
        if (!content) {
            wind = window.open('', 'Title', `toolbar=no, location=no, directories=no, status=yes, menubar=1, scrollbars=yes, resizable=yes, width=780, height=1000, top=${screen.height - 400}, left=${screen.width - 840}`);
            wind.document.head.innerHTML = getHead();
            wind.document.body.innerHTML = 'No glossary matches available.';
        } else if (content) {
            wind = window.open('', 'Title', `toolbar=no, location=no, directories=no, status=yes, menubar=1, scrollbars=yes, resizable=yes, width=780, height=1000, top=${screen.height - 400}, left=${screen.width - 840}`);
            wind.document.head.innerHTML = getHead();
        }
    }

    $(wind).on('beforeunload', () => {
        wind = undefined;
    });

    if (content) {
        try {
            wind.document.body.innerHTML = getBody(content);
        } catch (e) {
            debug.warn(e);
        }
    }

    try {
        $(wind.document.body).find('.cth-NEW').click(removeAndUpdateDatastore);
        $(wind.document.body).find('.cth-CHANGE').click(removeAndUpdateDatastore);

        hideDefinitionsStuff(wind.document);
        persistFontSize(wind.document);
    } catch (err) {
        debug.warn(err);
    }

    wind.blur();
}

export default putGlossariesInWindow;

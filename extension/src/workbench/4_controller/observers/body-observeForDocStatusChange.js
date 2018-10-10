/* global MutationObserver */
import $ from 'jquery';
import _ from 'lodash';
import { _retrieveStatusFromDoc } from '../../2_classes/upper-lib/runCompletionCheck/Completion';
const debug = require('cth-debug')(__filename.replace(/^src\//, ''));

export default function observeForStatusChange (cb) {
    $(document).on("click", ".goog-menuitem-content", function (event) {
        const text = event.target.childNodes[1];

        console.info(text);

        switch (text) {
            case "In translation":
                console.info("In translation");
                cb("In translation");
                break;
            default:
                break;
        }
    });
    $(document).on("click", ".gtc-dialog-confirm", function (event) {
        const dialogText = event.target.parentNode.parentNode.innerText;

        if (dialogText.match('Are you sure you want to change to "In copy edit" state?')) {
            return cb("OK");
        }
    });
}
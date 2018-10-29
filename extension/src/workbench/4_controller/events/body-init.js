import _ from 'lodash';
import $ from 'jquery';
import bodyEmitter from '../bodyEmitter';

import TransEditor from '../../2_classes/TransEditor';
import { convertAZippyToDiv } from '../../2_classes/convertAZippyToDiv';
import { qaSheet } from '../../2_classes/Qa/qa-sheet';
import { Font } from '../../2_classes/Font/Font';
import { Cursor } from '../../2_classes/Cursor';
import * as Hotkeys from '../../2_classes/Hotkeys';
import { highlightTextItems } from '../../2_classes/Document/highlightTextItems';
import { Dev } from '../../2_classes/Dev';
import changeReport from '../../2_classes/ChangeReport/ChangeReport';
import { Storage } from '../../../model/GeneralStorage';

const debug = require('cth-debug')(__filename.replace(/^src\//, ''));

bodyEmitter.on('init', (res) => {
    qaSheet(() => {
        Cursor.resetLoadIndication();
    });

    bodyEmitter.initListeners();

    Font.initSavedSize();

    if (cth.option.highlightTextItems) {
        highlightTextItems();
    }

    _.delay(Hotkeys.insertEndash, 5000);
    // Disabled ctrlK because of conflicting GTT hotkey
    // _.delay(Hotkeys.ctrlK, 5000);

    // Allow anyone to use dev mode without getting the quotes
    _.delay(function () {
        if (cth.docInfo.dokumentSprak && cth.docInfo.dokumentSprak.match(/^no$/i)) {
            Hotkeys.norwegianQuotes();
        }
    }, 5000);

    Dev(convertAZippyToDiv);
    Dev(TransEditor.update.bind(TransEditor));

    TransEditor.close();

    Storage.get({ storeName: 'translatedDocuments' }, cth.docInfo.prosjektNummer).then((retrievedDocument) => {
        if (!retrievedDocument) {
            debug.log("No stored document found");
            return;
        }

        // Check that user who last edited document is not yourself
        if (cth.docInfo.brukerNavn.replace(/(.*)@.*/, "$1") === cth.docInfo.userLastEdited) {
            debug.log("The last user who edited was yourself; so not showing any diff");
            return;
        }

        if (!['In translation'].includes(cth.docInfo.docStatusOnLoad)) {
            changeReport.init(cth.model.targetSegments.map(x => x.innerWithConvertedPlaceholders), retrievedDocument);

            changeReport.copyNodesAndHideOriginal();
        }
    });
});

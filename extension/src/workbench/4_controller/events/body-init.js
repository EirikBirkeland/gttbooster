import _ from 'lodash';
import $ from 'jquery';
import bodyEmitter from '../bodyEmitter';

import { updateTheTransEditor } from '../../2_classes/TransEditor/updateTheTransEditor';
import { convertAZippyToDiv } from '../../2_classes/convertAZippyToDiv';
import { qaSheet } from '../../2_classes/Qa/qa-sheet';
import { Font } from '../../2_classes/Font/Font';
import { Cursor } from '../../2_classes/Cursor';
import * as Hotkeys from '../../2_classes/Hotkeys';
import { highlightTextItems } from '../../2_classes/Document/highlightTextItems';
import { Dev } from '../../2_classes/Dev';
import changeReport from '../../2_classes/ChangeReport/ChangeReport';
import { Storage } from '../../../model/GeneralStorage';
import { TransEditor } from '../../2_classes/TransEditor/TransEditor';

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

    _.delay(Hotkeys.insertEndash, 2000);

    if (localStorage['cth-dev-mode']) {
        _.delay(Hotkeys.norwegianQuotes, 2000);
    }

    Dev(convertAZippyToDiv);
    Dev(updateTheTransEditor);

    TransEditor.close();

    
    Storage.get({ storeName: 'translatedDocuments' }, cth.docInfo.prosjektNummer).then((retrievedDocument) => {
        if (!retrievedDocument) {
            debug.info("No stored document found");
            return;
        }

        if (['In copy edit'].includes(cth.docInfo.docStatusOnLoad)) {
            changeReport.init(cth.model.targetSegments.map(x => x.innerWithConvertedPlaceholders), retrievedDocument);

            changeReport.copyNodesAndHideOriginal();
        }
    });
});

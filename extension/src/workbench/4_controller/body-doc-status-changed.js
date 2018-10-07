import bodyEmitter from '../bodyEmitter';
import { notifier } from '../2_classes/notifier';
import changeReport from '../2_classes/ChangeReport/ChangeReport';
import { Storage } from '../../model/GeneralStorage';

const debug = require('cth-debug')(__filename.replace(/^src\//, ''));

bodyEmitter.on('doc-status-changed', (res) => {
    debug.log('event doc-status-changed triggered. Res: ', res);

    if (res && res === 'click') {
        if (localStorage['cth-dev-mode'] && cth.clickedQmIcon !== true) {
            notifier.info('INFO: Query Manager has not been checked yet.');
        }
    }
});

bodyEmitter.on('doc-status-copyedit', () => {
    // Save changeReport when user switched to copy edit

    // first retrieve ay existing documents
    Storage.get({ storeName: 'translatedDocuments' }, cth.docInfo.prosjektNummer).then((retrievedDocuments) => {
        // then, update the translation document
        if(retrievedDocuments) debug.log(retrievedDocuments);
        changeReport.init(null, retrievedDocuments);
        changeReport.addDocumentSnapshot('Translation', cth.model.targetSegments.map(x => x.innerWithConvertedPlaceholders));
        debug.log("changereportCache", changeReport.cache);

        Storage.set({ storeName: 'translatedDocuments' }, cth.docInfo.prosjektNummer, changeReport.cache).then((res) => {
            if(res) debug.log(res);
        });
    });
});

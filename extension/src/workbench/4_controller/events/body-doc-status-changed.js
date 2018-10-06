import bodyEmitter from '../bodyEmitter'
import { notifier } from '../../2_classes/notifier'
import changeReport from '../../2_classes/ChangeReport';

const debug = require('cth-debug')(__filename.replace(/^src\//, ''))

bodyEmitter.on('doc-status-changed', (res) => {
    debug.log('event doc-status-changed triggered. Res: ', res)

    if (res && res === 'click') {
        if (localStorage['cth-dev-mode'] && cth.clickedQmIcon !== true) {
            notifier.info('INFO: Query Manager has not been checked yet.')
        }
    }
})

bodyEmitter.on('doc-status-copyedit', (string) => {
    // save changeReport
    changeReport.init(null)
    changeReport.addDocumentSnapshot('Translation', cth.model.targetSegments.map(x => x.innerWithConvertedPlaceholders))

})

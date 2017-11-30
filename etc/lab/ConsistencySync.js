// - I should go for message-passing over chrome.storage.local because it's more semantically sensible.


// CAPTAIN'S LOG:
// 29.10.2016: Was able to set up proper message passing. A structure is updated in the background while the translator is working.
// TODO: A view should be generated containing errors. These errors should be crossed out as the translator fixes any errors.

// TODO: Read this about different types of message passing:
// https://developer.chrome.com/extensions/messaging#connect
const ConsistencySync = {
    // to be called by background page ... ?
    checkWhetherActive: function () {
        const projectNumber = cth.docInfo.prosjektNummer
        const stored = localStorage[projectNumber + '-synchronization']
        if (stored && stored === 'true') {
            // Qa is active. Start sending to background.
        }
    },
    activateForThisProject: function () {
        const projectNumber = cth.docInfo.prosjektNummer

        // Set a flag in localStorage. This will be discovered by any newly opened tab.
        localStorage[projectNumber + '-synchronization'] = 'true'

        // First notify background page (we depend on him):
        chrome.runtime.sendMessage({
            header: 'consistencySync-init',
            body: {
                projectNumber: projectNumber
            }
        }, (res) => {
            // if successful, ask each browser tab for their document, continually
        })
    },
    debouncedHandler: function () {
        console.log('Running debounceHandler, without debounce')
        const projectNumber = cth.docInfo.prosjektNummer
        const docName = cth.docInfo.dokNavn.innerHTML
        // get all segments as some structure and send it
        chrome.runtime.sendMessage({
            header: 'consistencySync-document',
            body: {
                sourceSegments: cth.dom.sourceSegments.toStripped,
                targetSegments: cth.dom.targetSegments.toStripped,
                docName: docName,
                projectNumber: projectNumber
            }
        })
    }
}


export {ConsistencySync}
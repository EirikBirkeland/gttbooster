import goat from 'escape-goat'

const debug = require('cth-debug')(__filename)

export function handleTcRequest(info, tab) {
   debug.log(`item ${info.menuItemId} was clicked`)
   debug.log(`info: ${JSON.stringify(info, 0, 3)}`)
   debug.log(`tab: ${JSON.stringify(tab, 0, 3)}`)

   chrome.tabs.sendMessage(tab.id, "tcLookup", (res) => {
      debug.warn(res)
      const abc = `https://www.google.com/transconsole/externaltc/btviewer/searchresult?SearchText=${goat.escape(res.payload)}&SearchField=search_field_src&SearchType=search_type_token_and_phrase&ProductSelect=&LanguagesSelected=${res.language}&TranslationFilterStatus=translated&TranslationFilterAnyOrAll=any&TranslationFilterStage=LEVERAGED&ShowTranslationStage=showTranslationStage&CreatedAfter=&CreatedBefore=&ResourcesFilter=&IncludeObsolete=obsolete`
      window.open(abc)
   })
}
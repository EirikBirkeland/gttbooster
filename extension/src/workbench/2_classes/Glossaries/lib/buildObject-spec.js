// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 24.07.2016.
 */


import cheerio from 'cheerio'
import {buildObject} from "./buildObject"
import test from 'ava'

const $ = cheerio.load(glossariesArea())

test('should output a reasonably valid, parsed glossary object', (t) => {

   const res = buildObject($)
   t.is('object', typeof res)
   t.is('string', typeof res[0].$sourceTerm.html())
   t.is('string', typeof res[0].targetTerms[0].$targetTerm.html())
   t.is('string', typeof res[0].targetTerms[0].$partOfSpeech.html())
   t.is('string', typeof res[0].targetTerms[0].$description.html())

})

function glossariesArea() {

   const origin = 'https://translate.google.com/toolkit/workbench?did=00d8x4100vlhrdsrbytc' // Added 24.07.2016

   return `<div class="gtc-tools-autosearch"><div class="gtc-tool-right-floating" style="cursor: default;"><div class="gtc-tool-title gtc-tool-mt" style="cursor: default; display: none;">Computer Translation</div><div class="gtc-tool-content " style="cursor: default;"><div class="gtc-mt-suggestion-holder" style="cursor: default; display: none;"><span class="gtc-mt-suggestion" style="cursor: default;">Slette et opptak slettes ikke teksten i notatet.</span>
<span class="gtc-mt-use-suggestion" style="cursor: default;"><div id="gtc-mtusesugg-button" style="cursor: default;"><div role="button" class="goog-inline-block jfk-button jfk-button-standard" tabindex="0" style="-webkit-user-select: none; cursor: default;">Use suggestion</div></div></span></div></div><div class="gtc-tool-title gtc-tool-glossary" style="cursor: default;">Glossary (6)</div><div class="gtc-tool-content " style="cursor: default;"><div class="gtc-glossary-content-holder" style="cursor: default;"><ol style="cursor: default;"><li class="gtc-glossary-match-holder" style="cursor: default;"><span class="gtc-glossary-sourceterm" style="cursor: default;">note</span>
    <span class="gtc-glossary-terms" style="cursor: default;"><span class="gtc-glossary-translation" style="cursor: default;">kommentar</span>
    <span class="gtc-glossary-pos" style="cursor: default;">noun</span>
    <span class="gtc-glossary-language" style="cursor: default;"></span>
    <span id="gtc-gl-name-0" class="gtc-glossary-source" style="cursor: default;">Source: Product Search</span>
<span class="gtc-glossary-description" style="cursor: default;">A note or comment added to either an item or a shortlist.</span></span>   </li> <li class="gtc-glossary-match-holder" style="cursor: default;"><span class="gtc-glossary-sourceterm" style="cursor: default;">texting</span>
    <span class="gtc-glossary-terms" style="cursor: default;"><span class="gtc-glossary-translation" style="cursor: default;">sende tekstmelding</span>
<span class="gtc-glossary-pos" style="cursor: default;">noun</span>
    <span class="gtc-glossary-language" style="cursor: default;"></span>
    <span id="gtc-gl-name-4" class="gtc-glossary-source" style="cursor: default;">Source: Voice</span>
<span class="gtc-glossary-description" style="cursor: default;">Process of sending a text message (SMS) to a phone number.</span></span> </li> <li class="gtc-glossary-match-holder" style="cursor: default;"><span class="gtc-glossary-sourceterm" style="cursor: default;">A record</span>
<span class="gtc-glossary-terms" style="cursor: default;"><span class="gtc-glossary-translation" style="cursor: default;">A-poster</span>
    <span class="gtc-glossary-pos" style="cursor: default;">noun</span>
    <span class="gtc-glossary-language" style="cursor: default;"></span>
    <span id="gtc-gl-name-6" class="gtc-glossary-source" style="cursor: default;">Source: AdSense</span>
<span class="gtc-glossary-description" style="cursor: default;">An A record is part of the zone file. It is used to point Internet traffic to an IP address. A records must be configured to validate a publisher's ability to participate in the AdSense for domains program.</span></span>   </li> <li class="gtc-glossary-match-holder" style="cursor: default;"><span class="gtc-glossary-sourceterm" style="cursor: default;">Text</span>
<span class="gtc-glossary-terms" style="cursor: default;"><span class="gtc-glossary-translation" style="cursor: default;">Tekst</span>
    <span class="gtc-glossary-pos" style="cursor: default;">noun</span>
    <span class="gtc-glossary-language" style="cursor: default;"></span>
    <span id="gtc-gl-name-10" class="gtc-glossary-source" style="cursor: default;">Source: Photos</span>
<span class="gtc-glossary-description" style="cursor: default;">Option that allows you to add/edit text on a photo.</span></span></li> <li class="gtc-glossary-match-holder" style="cursor: default;"><span class="gtc-glossary-sourceterm" style="cursor: default;">text</span>
    <span class="gtc-glossary-terms" style="cursor: default;"><span class="gtc-glossary-translation" style="cursor: default;">sende melding</span>
<span class="gtc-glossary-pos" style="cursor: default;">verb</span>
    <span class="gtc-glossary-language" style="cursor: default;"></span>
    <span id="gtc-gl-name-11" class="gtc-glossary-source" style="cursor: default;">Source: Android</span>
<span class="gtc-glossary-description" style="cursor: default;">To send a text message (SMS).</span></span> </li> <li class="gtc-glossary-match-holder" style="cursor: default;"><span class="gtc-glossary-sourceterm" style="cursor: default;">delete</span>
    <span class="gtc-glossary-terms" style="cursor: default;"><span class="gtc-glossary-translation" style="cursor: default;">slette</span>
    <span class="gtc-glossary-pos" style="cursor: default;">verb</span>
    <span class="gtc-glossary-language" style="cursor: default;"></span>
    <span id="gtc-gl-name-13" class="gtc-glossary-source" style="cursor: default;">Source: Gmail</span>
<span class="gtc-glossary-description" style="cursor: default;">To move a message to the trash folder.</span></span> <span class="gtc-glossary-terms" style="cursor: default;"><span class="gtc-glossary-translation" style="cursor: default;">slette</span>
    <span class="gtc-glossary-pos" style="cursor: default;">verb</span>
    <span class="gtc-glossary-language" style="cursor: default;"></span>
    <span id="gtc-gl-name-14" class="gtc-glossary-source" style="cursor: default;">Source: General</span>
<span class="gtc-glossary-description" style="cursor: default;">To remove or erase data. For example, to delete a file, message, etc.</span></span>  </li></ol></div></div></div></div>`

}

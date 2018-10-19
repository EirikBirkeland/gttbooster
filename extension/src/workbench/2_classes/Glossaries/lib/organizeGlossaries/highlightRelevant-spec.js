import test from 'ava';
import { highlightRelevant } from './highlightRelevant';

const cheerio = require('cheerio');
const document = cheerio.load(domBefore());

test('should mutate the DOM as expected', (t) => {
   // 1. Mutate the dom
   highlightRelevant("Chrome", document);

   const mutatedText = document.html();

   // 2. Conform changes
   if (mutatedText.match(`<span style="color:blue"><b>Product Names</b></span>`)
   ) {
      return t.pass();
   }

   t.fail();
});

function domBefore () {
   return `<div class="gtc-tab-contentpane gtc-tools-autosearch" style=""><div class="gtc-tool-left-floating"><div class="gtc-tool-title gtc-tool-tm">Translation Search Results</div><div class="gtc-tool-content "><div class="gtc-tm-suggestion-holder"><span class="gtc-tm-suggestion-source-holder"><span class="gtc-tm-suggestion-source"><span class="gtc-tm-suggestion-hilite">Watch Google Play videos on your TV</span></span>
<span class="gtc-tm-suggestion-message">
<span>(In-context exact match)</span>
<span></span>
<span id="2gtc-tm-name-a246c9406449ca81;translation:1:0000000000000000:00000088f70474fe:0:^:;000523598365d600">Source: Google Play TM</span></span></span>
<span class="gtc-tm-suggestion-translation-holder "><span class="gtc-tm-suggestion-translation">Se Google Play-videoer på TV-en</span>
<span class="gtc-tm-suggestion-translator">Oct 30, 2015
003********@003******.com</span>


<span class="gtc-tm-target-language"></span>
<span id="2gtc-tm-rating-a246c9406449ca81;translation:1:0000000000000000:00000088f70474fe:0:^:;000523598365d600" class="gtc-tm-rating"></span></span></div> <div class="gtc-tm-suggestion-holder"><span class="gtc-tm-suggestion-source-holder"><span class="gtc-tm-suggestion-source"><span class="gtc-tm-suggestion-hilite">Watch Google Play</span> Movies <span class="gtc-tm-suggestion-hilite">on</span> Chromebook</span>
<span class="gtc-tm-suggestion-message">

<span></span>
<span id="2gtc-tm-name-a246c9406449ca81;translation:1:0000000000000000:000000c7adb988a1:1:^:;00054684e6c0a308">Source: Google Play TM</span></span></span>
<span class="gtc-tm-suggestion-translation-holder "><span class="gtc-tm-suggestion-translation">Se Google Play Filmer på Chromebook</span>
<span class="gtc-tm-suggestion-translator">Jan 20
003********@003******.com</span>


<span class="gtc-tm-target-language"></span>
<span id="2gtc-tm-rating-a246c9406449ca81;translation:1:0000000000000000:000000c7adb988a1:1:^:;00054684e6c0a308" class="gtc-tm-rating"></span></span></div> <div class="gtc-tm-suggestion-holder"><span class="gtc-tm-suggestion-source-holder"><span class="gtc-tm-suggestion-source"><span class="gtc-tm-suggestion-hilite">Watch Google Play</span> Movies <span class="gtc-tm-suggestion-hilite">on</span> Mac or PC</span>
<span class="gtc-tm-suggestion-message">

<span></span>
<span id="2gtc-tm-name-a246c9406449ca81;translation:1:0000000000000000:000000c7adb988a1:2:^:;00054684e6c09f20">Source: Google Play TM</span></span></span>
<span class="gtc-tm-suggestion-translation-holder "><span class="gtc-tm-suggestion-translation">Se Google Play Filmer på Mac eller PC</span>
<span class="gtc-tm-suggestion-translator">Jan 20
003********@003******.com</span>


<span class="gtc-tm-target-language"></span>
<span id="2gtc-tm-rating-a246c9406449ca81;translation:1:0000000000000000:000000c7adb988a1:2:^:;00054684e6c09f20" class="gtc-tm-rating"></span></span></div> <div class="gtc-tm-suggestion-holder"><span class="gtc-tm-suggestion-source-holder"><span class="gtc-tm-suggestion-source"><span class="gtc-tm-suggestion-hilite">Watch</span> <span class="gtc-tm-suggestion-hilite">videos on your TV</span> or computer</span>
<span class="gtc-tm-suggestion-message">

<span></span>
<span id="2gtc-tm-name-a246c9406449ca81;translation:1:0000000000000000:000000895da3e102:3:^:;0004f935d20804bd">Source: Google Play TM</span></span></span>
<span class="gtc-tm-suggestion-translation-holder "><span class="gtc-tm-suggestion-translation">Se videoer på TV-en eller datamaskinen din</span>
<span class="gtc-tm-suggestion-translator">May 12, 2014
003********@003******.com</span>


<span class="gtc-tm-target-language"></span>
<span id="2gtc-tm-rating-a246c9406449ca81;translation:1:0000000000000000:000000895da3e102:3:^:;0004f935d20804bd" class="gtc-tm-rating"></span></span></div> <div class="gtc-tm-suggestion-holder"><span class="gtc-tm-suggestion-source-holder"><span class="gtc-tm-suggestion-source"><span class="gtc-tm-suggestion-hilite">Play videos on</span> other devices</span>
<span class="gtc-tm-suggestion-message">

<span></span>
<span id="2gtc-tm-name-a246c9406449ca81;translation:1:0000000000000000:000000895da3e102:4:^:;0004f8f7ad6ed2a1">Source: Google Play TM</span></span></span>
<span class="gtc-tm-suggestion-translation-holder "><span class="gtc-tm-suggestion-translation">Spill av videoer på andre enheter</span>
<span class="gtc-tm-suggestion-translator">May 9, 2014
003********@003******.com</span>


<span class="gtc-tm-target-language"></span>
<span id="2gtc-tm-rating-a246c9406449ca81;translation:1:0000000000000000:000000895da3e102:4:^:;0004f8f7ad6ed2a1" class="gtc-tm-rating"></span></span></div> <div class="gtc-tm-suggestion-holder"><span class="gtc-tm-suggestion-source-holder"><span class="gtc-tm-suggestion-source">Using <span class="gtc-tm-suggestion-hilite">Google Play</span> Movies for Chrome, you can <span class="gtc-tm-suggestion-hilite">play videos on your TV</span> using Chromecast.</span>
<span class="gtc-tm-suggestion-message">

<span></span>
<span id="2gtc-tm-name-a246c9406449ca81;translation:1:0000000000000000:000000956441985b:5:^:;0004fb65be6e97ef">Source: Google Play TM</span></span></span>
<span class="gtc-tm-suggestion-translation-holder "><span class="gtc-tm-suggestion-translation">Med Google Play Filmer for Chrome kan du spille av videoer på TV-en din med Chromecast.</span>
<span class="gtc-tm-suggestion-translator">Jun 9, 2014
003********@003******.com</span>


<span class="gtc-tm-target-language"></span>
<span id="2gtc-tm-rating-a246c9406449ca81;translation:1:0000000000000000:000000956441985b:5:^:;0004fb65be6e97ef" class="gtc-tm-rating"></span></span></div> <div class="gtc-tm-suggestion-holder"><span class="gtc-tm-suggestion-source-holder"><span class="gtc-tm-suggestion-source">Problems watching <span class="gtc-tm-suggestion-hilite">videos on your</span> computer or <span class="gtc-tm-suggestion-hilite">TV</span></span>
<span class="gtc-tm-suggestion-message">

<span></span>
<span id="2gtc-tm-name-a246c9406449ca81;translation:1:0000000000000000:0000007ca0c404f2:6:^:;00050560dab395f8">Source: Google Play TM</span></span></span>
<span class="gtc-tm-suggestion-translation-holder "><span class="gtc-tm-suggestion-translation">Problemer med å se på videoer på datamaskinen eller TV-en</span>
<span class="gtc-tm-suggestion-translator">Oct 14, 2014
002********@002******.com</span>


<span class="gtc-tm-target-language"></span>
<span id="2gtc-tm-rating-a246c9406449ca81;translation:1:0000000000000000:0000007ca0c404f2:6:^:;00050560dab395f8" class="gtc-tm-rating"></span></span></div> <div class="gtc-tm-suggestion-holder"><span class="gtc-tm-suggestion-source-holder"><span class="gtc-tm-suggestion-source">Problems watching <span class="gtc-tm-suggestion-hilite">videos on your</span> computer or <span class="gtc-tm-suggestion-hilite">TV</span></span>
<span class="gtc-tm-suggestion-message">

<span></span>
<span id="2gtc-tm-name-a246c9406449ca81;translation:1:0000000000000000:00000012c1c3998e:7:^:;000549aee3593220">Source: Google Play TM</span></span></span>
<span class="gtc-tm-suggestion-translation-holder "><span class="gtc-tm-suggestion-translation">Problemer med å se på videoer på datamaskiner eller TV-er</span>
<span class="gtc-tm-suggestion-translator">Mar 1
003********@003******.com</span>


<span class="gtc-tm-target-language"></span>
<span id="2gtc-tm-rating-a246c9406449ca81;translation:1:0000000000000000:00000012c1c3998e:7:^:;000549aee3593220" class="gtc-tm-rating"></span></span></div> <div class="gtc-tm-suggestion-holder"><span class="gtc-tm-suggestion-source-holder"><span class="gtc-tm-suggestion-source"><span class="gtc-tm-suggestion-hilite">Watch Google Play</span> Movies &amp; <span class="gtc-tm-suggestion-hilite">TV</span> <span class="gtc-tm-suggestion-hilite">on</span> Roku</span>
<span class="gtc-tm-suggestion-message">

<span></span>
<span id="2gtc-tm-name-a246c9406449ca81;translation:1:0000000000000000:000000848ddc25b2:8:^:;0005053c7102cf75">Source: Google Play TM</span></span></span>
<span class="gtc-tm-suggestion-translation-holder "><span class="gtc-tm-suggestion-translation">Se på filmer og TV-programmer fra Google Play på Roku</span>
<span class="gtc-tm-suggestion-translator">Oct 12, 2014
003********@003******.com</span>


<span class="gtc-tm-target-language"></span>
<span id="2gtc-tm-rating-a246c9406449ca81;translation:1:0000000000000000:000000848ddc25b2:8:^:;0005053c7102cf75" class="gtc-tm-rating"></span></span></div> <div class="gtc-tm-suggestion-holder"><span class="gtc-tm-suggestion-source-holder"><span class="gtc-tm-suggestion-source">With <span class="gtc-tm-suggestion-hilite">Google Play</span> Movies <span class="gtc-tm-suggestion-hilite">on</span> Chromecast, you can <span class="gtc-tm-suggestion-hilite">watch</span> movies <span class="gtc-tm-suggestion-hilite">on your TV</span> using Chromecast.</span>
<span class="gtc-tm-suggestion-message">

<span></span>
<span id="2gtc-tm-name-a246c9406449ca81;translation:1:0000000000000000:0000007ca0c404f2:9:^:;00054684e6c09f20">Source: Google Play TM</span></span></span>
<span class="gtc-tm-suggestion-translation-holder "><span class="gtc-tm-suggestion-translation">Med Google Play Filmer på Chromecast kan du se filmer på TV-en med Chromecast.</span>
<span class="gtc-tm-suggestion-translator">Jan 20
002********@002******.com</span>


<span class="gtc-tm-target-language"></span>
<span id="2gtc-tm-rating-a246c9406449ca81;translation:1:0000000000000000:0000007ca0c404f2:9:^:;00054684e6c09f20" class="gtc-tm-rating"></span></span></div> <div class="gtc-tm-suggestion-holder"><span class="gtc-tm-suggestion-source-holder"><span class="gtc-tm-suggestion-source">Access <span class="gtc-tm-suggestion-hilite">your</span> purchased <span class="gtc-tm-suggestion-hilite">videos on your</span> iPhone or iPad</span>
<span class="gtc-tm-suggestion-message">

<span></span>
<span id="2gtc-tm-name-a246c9406449ca81;translation:1:0000000000000000:00000084e7dd8981:10:^:;0005599ea4f892a0">Source: Google Play TM</span></span></span>
<span class="gtc-tm-suggestion-translation-holder "><span class="gtc-tm-suggestion-translation">Se videoer du har kjøpt, på iPhone eller iPad</span>
<span class="gtc-tm-suggestion-translator">Sep 20
003********@003******.com</span>


<span class="gtc-tm-target-language"></span>
<span id="2gtc-tm-rating-a246c9406449ca81;translation:1:0000000000000000:00000084e7dd8981:10:^:;0005599ea4f892a0" class="gtc-tm-rating"></span></span></div> <div class="gtc-tm-suggestion-holder"><span class="gtc-tm-suggestion-source-holder"><span class="gtc-tm-suggestion-source"><span class="gtc-tm-suggestion-hilite">On your TV: {</span>0}<span class="gtc-tm-suggestion-hilite">Play</span> Music <span class="gtc-tm-suggestion-hilite">on your TV</span> with Chromecast.{/0}</span>
<span class="gtc-tm-suggestion-message">

<span></span>
<span id="2gtc-tm-name-a246c9406449ca81;translation:1:0000000000000000:00000084e7dd8981:11:^:;00053cf432bea538">Source: Google Play TM</span></span></span>
<span class="gtc-tm-suggestion-translation-holder "><span class="gtc-tm-suggestion-translation">På TV: {0}Spill av musikk på TV-en med Chromecast{/0}.</span>
<span class="gtc-tm-suggestion-translator">Sep 20, 2016
003********@003******.com</span>


<span class="gtc-tm-target-language"></span>
<span id="2gtc-tm-rating-a246c9406449ca81;translation:1:0000000000000000:00000084e7dd8981:11:^:;00053cf432bea538" class="gtc-tm-rating"></span></span></div> <div class="gtc-tm-suggestion-holder"><span class="gtc-tm-suggestion-source-holder"><span class="gtc-tm-suggestion-source">Access <span class="gtc-tm-suggestion-hilite">your</span> purchased <span class="gtc-tm-suggestion-hilite">videos on your</span> iPhone or iPad</span>
<span class="gtc-tm-suggestion-message">

<span></span>
<span id="2gtc-tm-name-a246c9406449ca81;translation:1:0000000000000000:0000006f13660e55:12:^:;000533c38dead510">Source: Google Play TM</span></span></span>
<span class="gtc-tm-suggestion-translation-holder "><span class="gtc-tm-suggestion-translation">Få tilgang til videoene du har kjøpt, på iPhone eller iPad</span>
<span class="gtc-tm-suggestion-translator">May 26, 2016
003********@003******.com</span>


<span class="gtc-tm-target-language"></span>
<span id="2gtc-tm-rating-a246c9406449ca81;translation:1:0000000000000000:0000006f13660e55:12:^:;000533c38dead510" class="gtc-tm-rating"></span></span></div> <div class="gtc-tm-suggestion-holder"><span class="gtc-tm-suggestion-source-holder"><span class="gtc-tm-suggestion-source"><span class="gtc-tm-suggestion-hilite">Watch</span> HD <span class="gtc-tm-suggestion-hilite">videos on your TV</span> screen with Apple <span class="gtc-tm-suggestion-hilite">TV</span> using AirPlay.</span>
<span class="gtc-tm-suggestion-message">

<span></span>
<span id="2gtc-tm-name-a246c9406449ca81;translation:1:0000000000000000:00000088f70474fe:13:^:;000525e98eb4e9f0">Source: Google Play TM</span></span></span>
<span class="gtc-tm-suggestion-translation-holder "><span class="gtc-tm-suggestion-translation">Se videoer i HD på TV-skjermen med Apple TV via AirPlay.</span>
<span class="gtc-tm-suggestion-translator">Dec 2, 2015
003********@003******.com</span>


<span class="gtc-tm-target-language"></span>
<span id="2gtc-tm-rating-a246c9406449ca81;translation:1:0000000000000000:00000088f70474fe:13:^:;000525e98eb4e9f0" class="gtc-tm-rating"></span></span></div> <div class="gtc-tm-suggestion-holder"><span class="gtc-tm-suggestion-source-holder"><span class="gtc-tm-suggestion-source">With the {0}<span class="gtc-tm-suggestion-hilite">Google Play</span> Movies &amp; <span class="gtc-tm-suggestion-hilite">TV{/</span>0} extension, you can <span class="gtc-tm-suggestion-hilite">play videos on your TV</span> using Chromecast.</span>
<span class="gtc-tm-suggestion-message">

<span></span>
<span id="2gtc-tm-name-a246c9406449ca81;translation:1:0000000000000000:0000007ca0c404f2:14:^:;000517c618d99770">Source: Google Play TM</span></span></span>
<span class="gtc-tm-suggestion-translation-holder "><span class="gtc-tm-suggestion-translation">Med {0}Google Play Filmer og TV{/0}-utvidelsen kan du spille av videoer på TV-en din med Chromecast.</span>
<span class="gtc-tm-suggestion-translator">Jun 5, 2015
002********@002******.com</span>


<span class="gtc-tm-target-language"></span>
<span id="2gtc-tm-rating-a246c9406449ca81;translation:1:0000000000000000:0000007ca0c404f2:14:^:;000517c618d99770" class="gtc-tm-rating"></span></span></div> <div class="gtc-tm-suggestion-holder"><span class="gtc-tm-suggestion-source-holder"><span class="gtc-tm-suggestion-source"><span class="gtc-tm-suggestion-hilite">On your TV: {</span>0}<span class="gtc-tm-suggestion-hilite">Watch</span> movies <span class="gtc-tm-suggestion-hilite">on your TV</span> with Chromecast{/0}.</span>
<span class="gtc-tm-suggestion-message">

<span></span>
<span id="2gtc-tm-name-a246c9406449ca81;translation:1:0000000000000000:00000084e7dd8981:15:^:;00053cf432bea538">Source: Google Play TM</span></span></span>
<span class="gtc-tm-suggestion-translation-holder "><span class="gtc-tm-suggestion-translation">På TV: {0}Se filmer på TV-en med Chromecast{/0}.</span>
<span class="gtc-tm-suggestion-translator">Sep 20, 2016
003********@003******.com</span>


<span class="gtc-tm-target-language"></span>
<span id="2gtc-tm-rating-a246c9406449ca81;translation:1:0000000000000000:00000084e7dd8981:15:^:;00053cf432bea538" class="gtc-tm-rating"></span></span></div> <div class="gtc-tm-suggestion-holder"><span class="gtc-tm-suggestion-source-holder"><span class="gtc-tm-suggestion-source">Use the <span class="gtc-tm-suggestion-hilite">Play</span> Movies &amp; <span class="gtc-tm-suggestion-hilite">TV</span> app to {0}<span class="gtc-tm-suggestion-hilite">watch</span> <span class="gtc-tm-suggestion-hilite">videos on your</span> Roku{/0}.</span>
<span class="gtc-tm-suggestion-message">

<span></span>
<span id="2gtc-tm-name-a246c9406449ca81;translation:1:0000000000000000:00000088f70474fe:16:^:;000523598365d600">Source: Google Play TM</span></span></span>
<span class="gtc-tm-suggestion-translation-holder "><span class="gtc-tm-suggestion-translation">Bruk Google Play Filmer og TV-appen for å {0}se videoer på Roku{/0}.</span>
<span class="gtc-tm-suggestion-translator">Oct 30, 2015
003********@003******.com</span>


<span class="gtc-tm-target-language"></span>
<span id="2gtc-tm-rating-a246c9406449ca81;translation:1:0000000000000000:00000088f70474fe:16:^:;000523598365d600" class="gtc-tm-rating"></span></span></div> <div class="gtc-tm-suggestion-holder"><span class="gtc-tm-suggestion-source-holder"><span class="gtc-tm-suggestion-source"><span class="gtc-tm-suggestion-hilite">Google Play videos</span> can only be watched <span class="gtc-tm-suggestion-hilite">on {</span>0}supported devices{/0}.</span>
<span class="gtc-tm-suggestion-message">

<span></span>
<span id="2gtc-tm-name-a246c9406449ca81;translation:1:0000000000000000:00000088f70474fe:17:^:;00051191c2fecd50">Source: Google Play TM</span></span></span>
<span class="gtc-tm-suggestion-translation-holder "><span class="gtc-tm-suggestion-translation">Google Play-videoer kan bare spilles av på {0}støttede enheter{/0}.</span>
<span class="gtc-tm-suggestion-translator">Mar 18, 2015
003********@003******.com</span>


<span class="gtc-tm-target-language"></span>
<span id="2gtc-tm-rating-a246c9406449ca81;translation:1:0000000000000000:00000088f70474fe:17:^:;00051191c2fecd50" class="gtc-tm-rating"></span></span></div> <div class="gtc-tm-suggestion-holder"><span class="gtc-tm-suggestion-source-holder"><span class="gtc-tm-suggestion-source"><span class="gtc-tm-suggestion-hilite">Google Play videos</span> can only be played <span class="gtc-tm-suggestion-hilite">on</span> supported devices.</span>
<span class="gtc-tm-suggestion-message">

<span></span>
<span id="2gtc-tm-name-a246c9406449ca81;translation:1:0000000000000000:00000088f70474fe:18:^:;0005109b8098ebb4">Source: Google Play TM</span></span></span>
<span class="gtc-tm-suggestion-translation-holder "><span class="gtc-tm-suggestion-translation">Google Play-videoer kan bare spilles av på støttede enheter.</span>
<span class="gtc-tm-suggestion-translator">Mar 6, 2015
003********@003******.com</span>


<span class="gtc-tm-target-language"></span>
<span id="2gtc-tm-rating-a246c9406449ca81;translation:1:0000000000000000:00000088f70474fe:18:^:;0005109b8098ebb4" class="gtc-tm-rating"></span></span></div> <div class="gtc-tm-suggestion-holder"><span class="gtc-tm-suggestion-source-holder"><span class="gtc-tm-suggestion-source"><span class="gtc-tm-suggestion-hilite">Play videos on your TV</span></span>
<span class="gtc-tm-suggestion-message">

<span></span>
<span id="2gtc-tm-name-b71b7f406c8cd920;translation:1:0000000000000000:000000213e014b94:19:^:;0004d8fe2cc2d0ec">Source: Android TM</span></span></span>
<span class="gtc-tm-suggestion-translation-holder "><span class="gtc-tm-suggestion-translation">Spill av videoer på TV-en din</span>
<span class="gtc-tm-suggestion-translator">Mar 28, 2013
00*****@gmail.com</span>


<span class="gtc-tm-target-language"></span>
<span id="2gtc-tm-rating-b71b7f406c8cd920;translation:1:0000000000000000:000000213e014b94:19:^:;0004d8fe2cc2d0ec" class="gtc-tm-rating"></span></span></div></div></div><div class="gtc-tool-right-floating"><div class="gtc-tool-title gtc-tool-mt">Computer Translation</div><div class="gtc-tool-content "><div class="gtc-mt-suggestion-holder"><span class="gtc-mt-suggestion">Se på Google Play-videoer på TVen din</span>
</div></div><div class="gtc-tool-title gtc-tool-glossary">Glossary (5)</div><div class="gtc-tool-content "><div class="gtc-glossary-content-holder"><div class="gtc-glossary-toolbox" id="gtc-gl-toolbox0"><span class="gtc-glossary-toolbox-span" id="gtc-gl-toolbox-source0" style="background-color: rgb(207, 225, 255);"><a href="#" class="gtc-glossary-button">Watches</a></span> <span class="gtc-glossary-toolbox-span" id="gtc-gl-toolbox-source1" style="background-color: rgb(207, 225, 255);"><a href="#" class="gtc-glossary-button">Google Play</a></span> <span class="gtc-glossary-toolbox-span" id="gtc-gl-toolbox-source3" style="background-color: rgb(249, 234, 167);"><a href="#" class="gtc-glossary-button">Play video</a></span> <span class="gtc-glossary-toolbox-span" id="gtc-gl-toolbox-source4" style="background-color: rgb(207, 225, 255);"><a href="#" class="gtc-glossary-button">video</a></span> <span class="gtc-glossary-toolbox-span" id="gtc-gl-toolbox-source6" style="background-color: rgb(207, 225, 255);"><a href="#" class="gtc-glossary-button">TV</a></span></div>
<div class="gtc-glossary-back-to-top"><a href="#gtc-gl-toolbox0">Back to top</a></div>
<div><a href="#" id="gtc-glossary-terminology-button0"><span class="gtc-glossary-terminology-dot">&nbsp;</span>
<span class="gtc-glossary-type">Terminology (4)</span>
<img src="./images/arrow.png" alt="" height="20" id="gtc-glossary-terminology-img0" class="gtc-glossary-arrow-up"></a>
<div id="gtc-glossary-terminology-list0" class="gtc-glossary-list"><ol><li class="gtc-glossary-match-holder"><span class="gtc-glossary-source" id="gtc-gl-source-0">Watches</span>
<span class="gtc-glossary-terms"><span class="gtc-glossary-translation">Sett</span>
<span class="gtc-glossary-pos">noun</span>
<span id="gtc-gl-name-0" class="gtc-glossary-source-name">Source: Google Plus</span>
<span class="gtc-glossary-description">Plural noun. This comes from the verb “to watch”. Watches is a Google+ feature within Diary which shows all the videos that you have watched (from YouTube or Netflix, for example).</span></span></li> <li class="gtc-glossary-match-holder"><span class="gtc-glossary-source" id="gtc-gl-source-2">Google Play</span>
<span class="gtc-glossary-terms"><span class="gtc-glossary-translation">Google Play</span>
<span class="gtc-glossary-pos">noun</span>
<span id="gtc-gl-name-2" class="gtc-glossary-source-name">Source: Product Names</span>
<span class="gtc-glossary-description">Google Play refers to an entire ecosystem which includes purchase, playback, and storage features and functionality. Google Play includes verticals such as books, movies, music, and apps, and may include more forms of digital content in the near future.</span></span></li> <li class="gtc-glossary-match-holder"><span class="gtc-glossary-source" id="gtc-gl-source-4">video</span>
<span class="gtc-glossary-terms"><span class="gtc-glossary-translation">video</span>
<span class="gtc-glossary-pos">noun</span>
<span id="gtc-gl-name-4" class="gtc-glossary-source-name">Source: General</span>
<span class="gtc-glossary-description">A media object with visual content; may or may not also have audio content.</span></span> <span class="gtc-glossary-source" id="gtc-gl-source-5">videos</span>
<span class="gtc-glossary-terms"><span class="gtc-glossary-translation">videoer</span>
<span class="gtc-glossary-pos">noun</span>
<span id="gtc-gl-name-5" class="gtc-glossary-source-name">Source: Photos</span>
<span class="gtc-glossary-description">Regular videos. Can be videos that you took using your phone, or videos imported from other sources.</span></span></li> <li class="gtc-glossary-match-holder"><span class="gtc-glossary-source" id="gtc-gl-source-6">TV</span>
<span class="gtc-glossary-terms"><span class="gtc-glossary-translation">TV</span>
<span class="gtc-glossary-pos">noun</span>
<span id="gtc-gl-name-6" class="gtc-glossary-source-name">Source: Chrome</span>
<span class="gtc-glossary-description">Short form of "Google Cast TV". Provides Google Cast functionality for television. NOTES: Please leave in English for all languages.</span></span></li></ol></div></div>
<div><a href="#" id="gtc-glossary-suggestion-button0"><span class="gtc-glossary-suggestion-dot">&nbsp;</span>
<span class="gtc-glossary-type">Suggestions from Translation Memory (1)</span>
<img src="./images/arrow.png" alt="" height="20" id="gtc-glossary-suggestion-img0"></a>
<div id="gtc-glossary-suggestion-list0" class="gtc-glossary-list" style="display: none;"><ol><li class="gtc-glossary-match-holder"><span class="gtc-glossary-source" id="gtc-gl-source-3">Play video</span>
<span class="gtc-glossary-terms"><span class="gtc-glossary-translation">Spill av videoen</span>
<span id="gtc-gl-name-3" class="gtc-glossary-source-name">Source: Photos</span></span></li></ol></div></div></div></div></div></div>`;
}

function domAfter () {
   return `<div class="gtc-tab-contentpane gtc-tools-autosearch" style="cursor: default;"><div class="gtc-tool-left-floating" style="cursor: default;"><div class="bootstrap-wrapper cth-fuzzy-copy-container" title="Click for summary display instead." style="cursor: default;"><span style="cursor: default;"># of TM matches: </span><span class="cth-fuzzy-copy label label-primary" style="margin: 2px; color: white; background-color: rgb(51, 122, 183); cursor: default;">1</span><span class="cth-fuzzy-copy label label-primary" style="margin: 2px; color: white; background-color: rgb(240, 173, 78); cursor: default;">3</span><span class="cth-fuzzy-copy label label-primary" style="margin: 2px; color: white; background-color: rgb(217, 83, 79); cursor: default;">16</span></div><div class="gtc-tool-title gtc-tool-tm" style="cursor: default;">Translation Search Results</div><div class="gtc-tool-content " style="cursor: default;">                   <div class="gtc-tm-suggestion-holder" style="cursor: default;"><span class="gtc-tm-suggestion-source-holder" style="cursor: default;"><span class="gtc-tm-suggestion-source" style="display: none; cursor: default;"><span class="gtc-tm-suggestion-hilite" style="cursor: default;">Watch Google Play videos on your TV</span></span>
<span class="gtc-tm-suggestion-message" style="cursor: default;">
<span style="cursor: default;">(In-context exact match)</span>
<span style="cursor: default;"></span>
<span id="2gtc-tm-name-a246c9406449ca81;translation:1:0000000000000000:00000088f70474fe:0:^:;000523598365d600" style="cursor: default;">Source: Google Play TM</span></span><span class="bootstrap-wrapper cth-spacious" style="cursor: default;"><span class="cth-fuzzy label label-primary" style="color: white; cursor: default;">100%</span><br style="cursor: default;"></span><span style="cursor: default;"> </span><span style="cursor: default;"><span style="cursor: default;">Watch Google Play videos on your TV</span></span><span style="display: none; cursor: default;"><span class="gtc-tm-suggestion-hilite" style="cursor: default;">Watch Google Play videos on your TV</span></span><span class="bootstrap-wrapper" style="cursor: default;"><button class="label label-primary cth-T-switch-button" data-toggle="tooltip" title="" style="opacity: 0.5; position: relative; float: right; top: -2px; margin-left: 5px; cursor: default;" data-original-title="Toggle between new and old highlighting.">T</button></span></span>
<span class="gtc-tm-suggestion-translation-holder " style="cursor: default;"><span class="gtc-tm-suggestion-translation" style="cursor: default;">Se Google Play-videoer på TV-en</span>
<span class="gtc-tm-suggestion-translator" style="cursor: default;">Oct 30, 2015
003********@003******.com</span>


<span class="gtc-tm-target-language" style="cursor: default;"></span>
<span id="2gtc-tm-rating-a246c9406449ca81;translation:1:0000000000000000:00000088f70474fe:0:^:;000523598365d600" class="gtc-tm-rating" style="cursor: default;"></span></span></div><div class="gtc-tm-suggestion-holder" style="cursor: default;"><span class="gtc-tm-suggestion-source-holder" style="cursor: default;"><span class="gtc-tm-suggestion-source" style="display: none; cursor: default;"><span class="gtc-tm-suggestion-hilite" style="cursor: default;">Watch Google Play</span> Movies <span class="gtc-tm-suggestion-hilite" style="cursor: default;">on</span> Mac or PC</span>
<span class="gtc-tm-suggestion-message" style="cursor: default;">

<span style="cursor: default;"></span>
<span id="2gtc-tm-name-a246c9406449ca81;translation:1:0000000000000000:000000c7adb988a1:2:^:;00054684e6c09f20" style="cursor: default;">Source: Google Play TM</span></span><span class="bootstrap-wrapper cth-spacious" style="cursor: default;"><span class="cth-fuzzy label label-warning" style="color: white; cursor: default;">70%</span><br style="cursor: default;"></span><span style="cursor: default;"> </span><span style="cursor: default;"><span style="cursor: default;">Watch Google Play </span><del style="background: rgb(255, 204, 204); cursor: default;">Movies on Mac or PC</del><ins style="background: rgb(204, 255, 204); cursor: default;">videos on your TV</ins></span><span style="display: none; cursor: default;"><span class="gtc-tm-suggestion-hilite" style="cursor: default;">Watch Google Play</span> Movies <span class="gtc-tm-suggestion-hilite" style="cursor: default;">on</span> Mac or PC</span><span class="bootstrap-wrapper" style="cursor: default;"><button class="label label-primary cth-T-switch-button" data-toggle="tooltip" title="" style="opacity: 0.5; position: relative; float: right; top: -2px; margin-left: 5px; cursor: default;" data-original-title="Toggle between new and old highlighting.">T</button></span></span>
<span class="gtc-tm-suggestion-translation-holder " style="cursor: default;"><span class="gtc-tm-suggestion-translation" style="cursor: default;">Se Google Play Filmer på Mac eller PC</span>
<span class="gtc-tm-suggestion-translator" style="cursor: default;">Jan 20
003********@003******.com</span>


<span class="gtc-tm-target-language" style="cursor: default;"></span>
<span id="2gtc-tm-rating-a246c9406449ca81;translation:1:0000000000000000:000000c7adb988a1:2:^:;00054684e6c09f20" class="gtc-tm-rating" style="cursor: default;"></span></span></div><div class="gtc-tm-suggestion-holder" style="cursor: default;"><span class="gtc-tm-suggestion-source-holder" style="cursor: default;"><span class="gtc-tm-suggestion-source" style="display: none; cursor: default;"><span class="gtc-tm-suggestion-hilite" style="cursor: default;">Watch Google Play</span> Movies <span class="gtc-tm-suggestion-hilite" style="cursor: default;">on</span> Chromebook</span>
<span class="gtc-tm-suggestion-message" style="cursor: default;">

<span style="cursor: default;"></span>
<span id="2gtc-tm-name-a246c9406449ca81;translation:1:0000000000000000:000000c7adb988a1:1:^:;00054684e6c0a308" style="cursor: default;">Source: Google Play TM</span></span><span class="bootstrap-wrapper cth-spacious" style="cursor: default;"><span class="cth-fuzzy label label-warning" style="color: white; cursor: default;">66%</span><br style="cursor: default;"></span><span style="cursor: default;"> </span><span style="cursor: default;"><span style="cursor: default;">Watch Google Play </span><del style="background: rgb(255, 204, 204); cursor: default;">Movies on Chromebook</del><ins style="background: rgb(204, 255, 204); cursor: default;">videos on your TV</ins></span><span style="display: none; cursor: default;"><span class="gtc-tm-suggestion-hilite" style="cursor: default;">Watch Google Play</span> Movies <span class="gtc-tm-suggestion-hilite" style="cursor: default;">on</span> Chromebook</span><span class="bootstrap-wrapper" style="cursor: default;"><button class="label label-primary cth-T-switch-button" data-toggle="tooltip" title="" style="opacity: 0.5; position: relative; float: right; top: -2px; margin-left: 5px; cursor: default;" data-original-title="Toggle between new and old highlighting.">T</button></span></span>
<span class="gtc-tm-suggestion-translation-holder " style="cursor: default;"><span class="gtc-tm-suggestion-translation" style="cursor: default;">Se Google Play Filmer på Chromebook</span>
<span class="gtc-tm-suggestion-translator" style="cursor: default;">Jan 20
003********@003******.com</span>


<span class="gtc-tm-target-language" style="cursor: default;"></span>
<span id="2gtc-tm-rating-a246c9406449ca81;translation:1:0000000000000000:000000c7adb988a1:1:^:;00054684e6c0a308" class="gtc-tm-rating" style="cursor: default;"></span></span></div><div class="gtc-tm-suggestion-holder" style="cursor: default;"><span class="gtc-tm-suggestion-source-holder" style="cursor: default;"><span class="gtc-tm-suggestion-source" style="display: none; cursor: default;"><span class="gtc-tm-suggestion-hilite" style="cursor: default;">Play videos on your TV</span></span>
<span class="gtc-tm-suggestion-message" style="cursor: default;">

<span style="cursor: default;"></span>
<span id="2gtc-tm-name-b71b7f406c8cd920;translation:1:0000000000000000:000000213e014b94:19:^:;0004d8fe2cc2d0ec" style="cursor: default;">Source: Android TM</span></span><span class="bootstrap-wrapper cth-spacious" style="cursor: default;"><span class="cth-fuzzy label label-warning" style="color: white; cursor: default;">63%</span><br style="cursor: default;"></span><span style="cursor: default;"> </span><span style="cursor: default;"><ins style="background: rgb(204, 255, 204); cursor: default;">Watch Google </ins><span style="cursor: default;">Play videos on your TV</span></span><span style="display: none; cursor: default;"><span class="gtc-tm-suggestion-hilite" style="cursor: default;">Play videos on your TV</span></span><span class="bootstrap-wrapper" style="cursor: default;"><button class="label label-primary cth-T-switch-button" data-toggle="tooltip" title="" style="opacity: 0.5; position: relative; float: right; top: -2px; margin-left: 5px; cursor: default;" data-original-title="Toggle between new and old highlighting.">T</button></span></span>
<span class="gtc-tm-suggestion-translation-holder " style="cursor: default;"><span class="gtc-tm-suggestion-translation" style="cursor: default;">Spill av videoer på TV-en din</span>
<span class="gtc-tm-suggestion-translator" style="cursor: default;">Mar 28, 2013
00*****@gmail.com</span>


<span class="gtc-tm-target-language" style="cursor: default;"></span>
<span id="2gtc-tm-rating-b71b7f406c8cd920;translation:1:0000000000000000:000000213e014b94:19:^:;0004d8fe2cc2d0ec" class="gtc-tm-rating" style="cursor: default;"></span></span></div><div class="gtc-tm-suggestion-holder" style="cursor: default;"><span class="gtc-tm-suggestion-source-holder" style="cursor: default;"><span class="gtc-tm-suggestion-source" style="display: none; cursor: default;"><span class="gtc-tm-suggestion-hilite" style="cursor: default;">Watch Google Play</span> Movies &amp; <span class="gtc-tm-suggestion-hilite" style="cursor: default;">TV</span> <span class="gtc-tm-suggestion-hilite" style="cursor: default;">on</span> Roku</span>
<span class="gtc-tm-suggestion-message" style="cursor: default;">

<span style="cursor: default;"></span>
<span id="2gtc-tm-name-a246c9406449ca81;translation:1:0000000000000000:000000848ddc25b2:8:^:;0005053c7102cf75" style="cursor: default;">Source: Google Play TM</span></span><span class="bootstrap-wrapper cth-spacious" style="cursor: default;"><span class="cth-fuzzy label label-danger" style="color: white; cursor: default;">56%</span><br style="cursor: default;"></span><span style="cursor: default;"> </span><span style="cursor: default;"><span style="cursor: default;">Watch Google Play </span><del style="background: rgb(255, 204, 204); cursor: default;">Movies &amp;amp; TV on Roku</del><ins style="background: rgb(204, 255, 204); cursor: default;">videos on your TV</ins></span><span style="display: none; cursor: default;"><span class="gtc-tm-suggestion-hilite" style="cursor: default;">Watch Google Play</span> Movies &amp; <span class="gtc-tm-suggestion-hilite" style="cursor: default;">TV</span> <span class="gtc-tm-suggestion-hilite" style="cursor: default;">on</span> Roku</span><span class="bootstrap-wrapper" style="cursor: default;"><button class="label label-primary cth-T-switch-button" data-toggle="tooltip" title="" style="opacity: 0.5; position: relative; float: right; top: -2px; margin-left: 5px; cursor: default;" data-original-title="Toggle between new and old highlighting.">T</button></span></span>
<span class="gtc-tm-suggestion-translation-holder " style="cursor: default;"><span class="gtc-tm-suggestion-translation" style="cursor: default;">Se på filmer og TV-programmer fra Google Play på Roku</span>
<span class="gtc-tm-suggestion-translator" style="cursor: default;">Oct 12, 2014
003********@003******.com</span>


<span class="gtc-tm-target-language" style="cursor: default;"></span>
<span id="2gtc-tm-rating-a246c9406449ca81;translation:1:0000000000000000:000000848ddc25b2:8:^:;0005053c7102cf75" class="gtc-tm-rating" style="cursor: default;"></span></span></div><div class="gtc-tm-suggestion-holder" style="cursor: default;"><span class="gtc-tm-suggestion-source-holder" style="cursor: default;"><span class="gtc-tm-suggestion-source" style="display: none; cursor: default;">Problems watching <span class="gtc-tm-suggestion-hilite" style="cursor: default;">videos on your</span> computer or <span class="gtc-tm-suggestion-hilite" style="cursor: default;">TV</span></span>
<span class="gtc-tm-suggestion-message" style="cursor: default;">

<span style="cursor: default;"></span>
<span id="2gtc-tm-name-a246c9406449ca81;translation:1:0000000000000000:0000007ca0c404f2:6:^:;00050560dab395f8" style="cursor: default;">Source: Google Play TM</span></span><span class="bootstrap-wrapper cth-spacious" style="cursor: default;"><span class="cth-fuzzy label label-danger" style="color: white; cursor: default;">38%</span><br style="cursor: default;"></span><span style="cursor: default;"> </span><span style="cursor: default;"><del style="background: rgb(255, 204, 204); cursor: default;">Problems watching</del><ins style="background: rgb(204, 255, 204); cursor: default;">Watch Google Play</ins><span style="cursor: default;"> videos on your </span><del style="background: rgb(255, 204, 204); cursor: default;">computer or </del><span style="cursor: default;">TV</span></span><span style="display: none; cursor: default;">Problems watching <span class="gtc-tm-suggestion-hilite" style="cursor: default;">videos on your</span> computer or <span class="gtc-tm-suggestion-hilite" style="cursor: default;">TV</span></span><span class="bootstrap-wrapper" style="cursor: default;"><button class="label label-primary cth-T-switch-button" data-toggle="tooltip" title="" style="opacity: 0.5; position: relative; float: right; top: -2px; margin-left: 5px; cursor: default;" data-original-title="Toggle between new and old highlighting.">T</button></span></span>
<span class="gtc-tm-suggestion-translation-holder " style="cursor: default;"><span class="gtc-tm-suggestion-translation" style="cursor: default;">Problemer med å se på videoer på datamaskinen eller TV-en</span>
<span class="gtc-tm-suggestion-translator" style="cursor: default;">Oct 14, 2014
002********@002******.com</span>


<span class="gtc-tm-target-language" style="cursor: default;"></span>
<span id="2gtc-tm-rating-a246c9406449ca81;translation:1:0000000000000000:0000007ca0c404f2:6:^:;00050560dab395f8" class="gtc-tm-rating" style="cursor: default;"></span></span></div><div class="gtc-tm-suggestion-holder" style="cursor: default;"><span class="gtc-tm-suggestion-source-holder" style="cursor: default;"><span class="gtc-tm-suggestion-source" style="display: none; cursor: default;">Problems watching <span class="gtc-tm-suggestion-hilite" style="cursor: default;">videos on your</span> computer or <span class="gtc-tm-suggestion-hilite" style="cursor: default;">TV</span></span>
<span class="gtc-tm-suggestion-message" style="cursor: default;">

<span style="cursor: default;"></span>
<span id="2gtc-tm-name-a246c9406449ca81;translation:1:0000000000000000:00000012c1c3998e:7:^:;000549aee3593220" style="cursor: default;">Source: Google Play TM</span></span><span class="bootstrap-wrapper cth-spacious" style="cursor: default;"><span class="cth-fuzzy label label-danger" style="color: white; cursor: default;">38%</span><br style="cursor: default;"></span><span style="cursor: default;"> </span><span style="cursor: default;"><del style="background: rgb(255, 204, 204); cursor: default;">Problems watching</del><ins style="background: rgb(204, 255, 204); cursor: default;">Watch Google Play</ins><span style="cursor: default;"> videos on your </span><del style="background: rgb(255, 204, 204); cursor: default;">computer or </del><span style="cursor: default;">TV</span></span><span style="display: none; cursor: default;">Problems watching <span class="gtc-tm-suggestion-hilite" style="cursor: default;">videos on your</span> computer or <span class="gtc-tm-suggestion-hilite" style="cursor: default;">TV</span></span><span class="bootstrap-wrapper" style="cursor: default;"><button class="label label-primary cth-T-switch-button" data-toggle="tooltip" title="" style="opacity: 0.5; position: relative; float: right; top: -2px; margin-left: 5px; cursor: default;" data-original-title="Toggle between new and old highlighting.">T</button></span></span>
<span class="gtc-tm-suggestion-translation-holder " style="cursor: default;"><span class="gtc-tm-suggestion-translation" style="cursor: default;">Problemer med å se på videoer på datamaskiner eller TV-er</span>
<span class="gtc-tm-suggestion-translator" style="cursor: default;">Mar 1
003********@003******.com</span>


<span class="gtc-tm-target-language" style="cursor: default;"></span>
<span id="2gtc-tm-rating-a246c9406449ca81;translation:1:0000000000000000:00000012c1c3998e:7:^:;000549aee3593220" class="gtc-tm-rating" style="cursor: default;"></span></span></div><div class="gtc-tm-suggestion-holder" style="cursor: default;"><span class="gtc-tm-suggestion-source-holder" style="cursor: default;"><span class="gtc-tm-suggestion-source" style="display: none; cursor: default;">Access <span class="gtc-tm-suggestion-hilite" style="cursor: default;">your</span> purchased <span class="gtc-tm-suggestion-hilite" style="cursor: default;">videos on your</span> iPhone or iPad</span>
<span class="gtc-tm-suggestion-message" style="cursor: default;">

<span style="cursor: default;"></span>
<span id="2gtc-tm-name-a246c9406449ca81;translation:1:0000000000000000:0000006f13660e55:12:^:;000533c38dead510" style="cursor: default;">Source: Google Play TM</span></span><span class="bootstrap-wrapper cth-spacious" style="cursor: default;"><span class="cth-fuzzy label label-danger" style="color: white; cursor: default;">37%</span><br style="cursor: default;"></span><span style="cursor: default;"> </span><span style="cursor: default;"><del style="background: rgb(255, 204, 204); cursor: default;">Access your purchased</del><ins style="background: rgb(204, 255, 204); cursor: default;">Watch Google Play</ins><span style="cursor: default;"> videos on your </span><del style="background: rgb(255, 204, 204); cursor: default;">iPhone or iPad</del><ins style="background: rgb(204, 255, 204); cursor: default;">TV</ins></span><span style="display: none; cursor: default;">Access <span class="gtc-tm-suggestion-hilite" style="cursor: default;">your</span> purchased <span class="gtc-tm-suggestion-hilite" style="cursor: default;">videos on your</span> iPhone or iPad</span><span class="bootstrap-wrapper" style="cursor: default;"><button class="label label-primary cth-T-switch-button" data-toggle="tooltip" title="" style="opacity: 0.5; position: relative; float: right; top: -2px; margin-left: 5px; cursor: default;" data-original-title="Toggle between new and old highlighting.">T</button></span></span>
<span class="gtc-tm-suggestion-translation-holder " style="cursor: default;"><span class="gtc-tm-suggestion-translation" style="cursor: default;">Få tilgang til videoene du har kjøpt, på iPhone eller iPad</span>
<span class="gtc-tm-suggestion-translator" style="cursor: default;">May 26, 2016
003********@003******.com</span>


<span class="gtc-tm-target-language" style="cursor: default;"></span>
<span id="2gtc-tm-rating-a246c9406449ca81;translation:1:0000000000000000:0000006f13660e55:12:^:;000533c38dead510" class="gtc-tm-rating" style="cursor: default;"></span></span></div><div class="gtc-tm-suggestion-holder" style="cursor: default;"><span class="gtc-tm-suggestion-source-holder" style="cursor: default;"><span class="gtc-tm-suggestion-source" style="display: none; cursor: default;">Access <span class="gtc-tm-suggestion-hilite" style="cursor: default;">your</span> purchased <span class="gtc-tm-suggestion-hilite" style="cursor: default;">videos on your</span> iPhone or iPad</span>
<span class="gtc-tm-suggestion-message" style="cursor: default;">

<span style="cursor: default;"></span>
<span id="2gtc-tm-name-a246c9406449ca81;translation:1:0000000000000000:00000084e7dd8981:10:^:;0005599ea4f892a0" style="cursor: default;">Source: Google Play TM</span></span><span class="bootstrap-wrapper cth-spacious" style="cursor: default;"><span class="cth-fuzzy label label-danger" style="color: white; cursor: default;">37%</span><br style="cursor: default;"></span><span style="cursor: default;"> </span><span style="cursor: default;"><del style="background: rgb(255, 204, 204); cursor: default;">Access your purchased</del><ins style="background: rgb(204, 255, 204); cursor: default;">Watch Google Play</ins><span style="cursor: default;"> videos on your </span><del style="background: rgb(255, 204, 204); cursor: default;">iPhone or iPad</del><ins style="background: rgb(204, 255, 204); cursor: default;">TV</ins></span><span style="display: none; cursor: default;">Access <span class="gtc-tm-suggestion-hilite" style="cursor: default;">your</span> purchased <span class="gtc-tm-suggestion-hilite" style="cursor: default;">videos on your</span> iPhone or iPad</span><span class="bootstrap-wrapper" style="cursor: default;"><button class="label label-primary cth-T-switch-button" data-toggle="tooltip" title="" style="opacity: 0.5; position: relative; float: right; top: -2px; margin-left: 5px; cursor: default;" data-original-title="Toggle between new and old highlighting.">T</button></span></span>
<span class="gtc-tm-suggestion-translation-holder " style="cursor: default;"><span class="gtc-tm-suggestion-translation" style="cursor: default;">Se videoer du har kjøpt, på iPhone eller iPad</span>
<span class="gtc-tm-suggestion-translator" style="cursor: default;">Sep 20
003********@003******.com</span>


<span class="gtc-tm-target-language" style="cursor: default;"></span>
<span id="2gtc-tm-rating-a246c9406449ca81;translation:1:0000000000000000:00000084e7dd8981:10:^:;0005599ea4f892a0" class="gtc-tm-rating" style="cursor: default;"></span></span></div><div class="gtc-tm-suggestion-holder" style="cursor: default;"><span class="gtc-tm-suggestion-source-holder" style="cursor: default;"><span class="gtc-tm-suggestion-source" style="display: none; cursor: default;"><span class="gtc-tm-suggestion-hilite" style="cursor: default;">Google Play videos</span> can only be played <span class="gtc-tm-suggestion-hilite" style="cursor: default;">on</span> supported devices.</span>
<span class="gtc-tm-suggestion-message" style="cursor: default;">

<span style="cursor: default;"></span>
<span id="2gtc-tm-name-a246c9406449ca81;translation:1:0000000000000000:00000088f70474fe:18:^:;0005109b8098ebb4" style="cursor: default;">Source: Google Play TM</span></span><span class="bootstrap-wrapper cth-spacious" style="cursor: default;"><span class="cth-fuzzy label label-danger" style="color: white; cursor: default;">36%</span><br style="cursor: default;"></span><span style="cursor: default;"> </span><span style="cursor: default;"><ins style="background: rgb(204, 255, 204); cursor: default;">Watch </ins><span style="cursor: default;">Google Play videos </span><del style="background: rgb(255, 204, 204); cursor: default;">can only be played on supported devices.</del><ins style="background: rgb(204, 255, 204); cursor: default;">on your TV</ins></span><span style="display: none; cursor: default;"><span class="gtc-tm-suggestion-hilite" style="cursor: default;">Google Play videos</span> can only be played <span class="gtc-tm-suggestion-hilite" style="cursor: default;">on</span> supported devices.</span><span class="bootstrap-wrapper" style="cursor: default;"><button class="label label-primary cth-T-switch-button" data-toggle="tooltip" title="" style="opacity: 0.5; position: relative; float: right; top: -2px; margin-left: 5px; cursor: default;" data-original-title="Toggle between new and old highlighting.">T</button></span></span>
<span class="gtc-tm-suggestion-translation-holder " style="cursor: default;"><span class="gtc-tm-suggestion-translation" style="cursor: default;">Google Play-videoer kan bare spilles av på støttede enheter.</span>
<span class="gtc-tm-suggestion-translator" style="cursor: default;">Mar 6, 2015
003********@003******.com</span>


<span class="gtc-tm-target-language" style="cursor: default;"></span>
<span id="2gtc-tm-rating-a246c9406449ca81;translation:1:0000000000000000:00000088f70474fe:18:^:;0005109b8098ebb4" class="gtc-tm-rating" style="cursor: default;"></span></span></div><div class="gtc-tm-suggestion-holder" style="cursor: default;"><span class="gtc-tm-suggestion-source-holder" style="cursor: default;"><span class="gtc-tm-suggestion-source" style="display: none; cursor: default;">With <span class="gtc-tm-suggestion-hilite" style="cursor: default;">Google Play</span> Movies <span class="gtc-tm-suggestion-hilite" style="cursor: default;">on</span> Chromecast, you can <span class="gtc-tm-suggestion-hilite" style="cursor: default;">watch</span> movies <span class="gtc-tm-suggestion-hilite" style="cursor: default;">on your TV</span> using Chromecast.</span>
<span class="gtc-tm-suggestion-message" style="cursor: default;">

<span style="cursor: default;"></span>
<span id="2gtc-tm-name-a246c9406449ca81;translation:1:0000000000000000:0000007ca0c404f2:9:^:;00054684e6c09f20" style="cursor: default;">Source: Google Play TM</span></span><span class="bootstrap-wrapper cth-spacious" style="cursor: default;"><span class="cth-fuzzy label label-danger" style="color: white; cursor: default;">35%</span><br style="cursor: default;"></span><span style="cursor: default;"> </span><span style="cursor: default;"><span style="cursor: default;">W</span><del style="background: rgb(255, 204, 204); cursor: default;">it</del><ins style="background: rgb(204, 255, 204); cursor: default;">atc</ins><span style="cursor: default;">h Google Play </span><del style="background: rgb(255, 204, 204); cursor: default;">Movies on Chromecast, you can watch movies on your TV using Chromecast.</del><ins style="background: rgb(204, 255, 204); cursor: default;">videos on your TV</ins></span><span style="display: none; cursor: default;">With <span class="gtc-tm-suggestion-hilite" style="cursor: default;">Google Play</span> Movies <span class="gtc-tm-suggestion-hilite" style="cursor: default;">on</span> Chromecast, you can <span class="gtc-tm-suggestion-hilite" style="cursor: default;">watch</span> movies <span class="gtc-tm-suggestion-hilite" style="cursor: default;">on your TV</span> using Chromecast.</span><span class="bootstrap-wrapper" style="cursor: default;"><button class="label label-primary cth-T-switch-button" data-toggle="tooltip" title="" style="opacity: 0.5; position: relative; float: right; top: -2px; margin-left: 5px; cursor: default;" data-original-title="Toggle between new and old highlighting.">T</button></span></span>
<span class="gtc-tm-suggestion-translation-holder " style="cursor: default;"><span class="gtc-tm-suggestion-translation" style="cursor: default;">Med Google Play Filmer på Chromecast kan du se filmer på TV-en med Chromecast.</span>
<span class="gtc-tm-suggestion-translator" style="cursor: default;">Jan 20
002********@002******.com</span>


<span class="gtc-tm-target-language" style="cursor: default;"></span>
<span id="2gtc-tm-rating-a246c9406449ca81;translation:1:0000000000000000:0000007ca0c404f2:9:^:;00054684e6c09f20" class="gtc-tm-rating" style="cursor: default;"></span></span></div><div class="gtc-tm-suggestion-holder" style="cursor: default;"><span class="gtc-tm-suggestion-source-holder" style="cursor: default;"><span class="gtc-tm-suggestion-source" style="display: none; cursor: default;">Using <span class="gtc-tm-suggestion-hilite" style="cursor: default;">Google Play</span> Movies for Chrome, you can <span class="gtc-tm-suggestion-hilite" style="cursor: default;">play videos on your TV</span> using Chromecast.</span>
<span class="gtc-tm-suggestion-message" style="cursor: default;">

<span style="cursor: default;"></span>
<span id="2gtc-tm-name-a246c9406449ca81;translation:1:0000000000000000:000000956441985b:5:^:;0004fb65be6e97ef" style="cursor: default;">Source: Google Play TM</span></span><span class="bootstrap-wrapper cth-spacious" style="cursor: default;"><span class="cth-fuzzy label label-danger" style="color: white; cursor: default;">35%</span><br style="cursor: default;"></span><span style="cursor: default;"> </span><span style="cursor: default;"><del style="background: rgb(255, 204, 204); cursor: default;">Using</del><ins style="background: rgb(204, 255, 204); cursor: default;">Watch</ins><span style="cursor: default;"> Google Play </span><del style="background: rgb(255, 204, 204); cursor: default;">Movies for Chrome, you can play videos on your TV using Chromecast.</del><ins style="background: rgb(204, 255, 204); cursor: default;">videos on your TV</ins></span><span style="display: none; cursor: default;">Using <span class="gtc-tm-suggestion-hilite" style="cursor: default;">Google Play</span> Movies for Chrome, you can <span class="gtc-tm-suggestion-hilite" style="cursor: default;">play videos on your TV</span> using Chromecast.</span><span class="bootstrap-wrapper" style="cursor: default;"><button class="label label-primary cth-T-switch-button" data-toggle="tooltip" title="" style="opacity: 0.5; position: relative; float: right; top: -2px; margin-left: 5px; cursor: default;" data-original-title="Toggle between new and old highlighting.">T</button></span></span>
<span class="gtc-tm-suggestion-translation-holder " style="cursor: default;"><span class="gtc-tm-suggestion-translation" style="cursor: default;">Med Google Play Filmer for Chrome kan du spille av videoer på TV-en din med Chromecast.</span>
<span class="gtc-tm-suggestion-translator" style="cursor: default;">Jun 9, 2014
003********@003******.com</span>


<span class="gtc-tm-target-language" style="cursor: default;"></span>
<span id="2gtc-tm-rating-a246c9406449ca81;translation:1:0000000000000000:000000956441985b:5:^:;0004fb65be6e97ef" class="gtc-tm-rating" style="cursor: default;"></span></span></div><div class="gtc-tm-suggestion-holder" style="cursor: default;"><span class="gtc-tm-suggestion-source-holder" style="cursor: default;"><span class="gtc-tm-suggestion-source" style="display: none; cursor: default;">With the {0}<span class="gtc-tm-suggestion-hilite" style="cursor: default;">Google Play</span> Movies &amp; <span class="gtc-tm-suggestion-hilite" style="cursor: default;">TV{/</span>0} extension, you can <span class="gtc-tm-suggestion-hilite" style="cursor: default;">play videos on your TV</span> using Chromecast.</span>
<span class="gtc-tm-suggestion-message" style="cursor: default;">

<span style="cursor: default;"></span>
<span id="2gtc-tm-name-a246c9406449ca81;translation:1:0000000000000000:0000007ca0c404f2:14:^:;000517c618d99770" style="cursor: default;">Source: Google Play TM</span></span><span class="bootstrap-wrapper cth-spacious" style="cursor: default;"><span class="cth-fuzzy label label-danger" style="color: white; cursor: default;">32%</span><br style="cursor: default;"></span><span style="cursor: default;"> </span><span style="cursor: default;"><span style="cursor: default;">W</span><del style="background: rgb(255, 204, 204); cursor: default;">ith the {0}</del><ins style="background: rgb(204, 255, 204); cursor: default;">atch </ins><span style="cursor: default;">Google Play </span><del style="background: rgb(255, 204, 204); cursor: default;">Movies &amp;amp; TV{/0} extension, you can play videos on your TV using Chromecast.</del><ins style="background: rgb(204, 255, 204); cursor: default;">videos on your TV</ins></span><span style="display: none; cursor: default;">With the {0}<span class="gtc-tm-suggestion-hilite" style="cursor: default;">Google Play</span> Movies &amp; <span class="gtc-tm-suggestion-hilite" style="cursor: default;">TV{/</span>0} extension, you can <span class="gtc-tm-suggestion-hilite" style="cursor: default;">play videos on your TV</span> using Chromecast.</span><span class="bootstrap-wrapper" style="cursor: default;"><button class="label label-primary cth-T-switch-button" data-toggle="tooltip" title="" style="opacity: 0.5; position: relative; float: right; top: -2px; margin-left: 5px; cursor: default;" data-original-title="Toggle between new and old highlighting.">T</button></span></span>
<span class="gtc-tm-suggestion-translation-holder " style="cursor: default;"><span class="gtc-tm-suggestion-translation" style="cursor: default;">Med {0}Google Play Filmer og TV{/0}-utvidelsen kan du spille av videoer på TV-en din med Chromecast.</span>
<span class="gtc-tm-suggestion-translator" style="cursor: default;">Jun 5, 2015
002********@002******.com</span>


<span class="gtc-tm-target-language" style="cursor: default;"></span>
<span id="2gtc-tm-rating-a246c9406449ca81;translation:1:0000000000000000:0000007ca0c404f2:14:^:;000517c618d99770" class="gtc-tm-rating" style="cursor: default;"></span></span></div><div class="gtc-tm-suggestion-holder" style="cursor: default;"><span class="gtc-tm-suggestion-source-holder" style="cursor: default;"><span class="gtc-tm-suggestion-source" style="display: none; cursor: default;">Use the <span class="gtc-tm-suggestion-hilite" style="cursor: default;">Play</span> Movies &amp; <span class="gtc-tm-suggestion-hilite" style="cursor: default;">TV</span> app to {0}<span class="gtc-tm-suggestion-hilite" style="cursor: default;">watch</span> <span class="gtc-tm-suggestion-hilite" style="cursor: default;">videos on your</span> Roku{/0}.</span>
<span class="gtc-tm-suggestion-message" style="cursor: default;">

<span style="cursor: default;"></span>
<span id="2gtc-tm-name-a246c9406449ca81;translation:1:0000000000000000:00000088f70474fe:16:^:;000523598365d600" style="cursor: default;">Source: Google Play TM</span></span><span class="bootstrap-wrapper cth-spacious" style="cursor: default;"><span class="cth-fuzzy label label-danger" style="color: white; cursor: default;">32%</span><br style="cursor: default;"></span><span style="cursor: default;"> </span><span style="cursor: default;"><del style="background: rgb(255, 204, 204); cursor: default;">Use the Play Movies &amp;amp; TV app to {0}watch</del><ins style="background: rgb(204, 255, 204); cursor: default;">Watch Google Play</ins><span style="cursor: default;"> videos on your </span><del style="background: rgb(255, 204, 204); cursor: default;">Roku{/0}.</del><ins style="background: rgb(204, 255, 204); cursor: default;">TV</ins></span><span style="display: none; cursor: default;">Use the <span class="gtc-tm-suggestion-hilite" style="cursor: default;">Play</span> Movies &amp; <span class="gtc-tm-suggestion-hilite" style="cursor: default;">TV</span> app to {0}<span class="gtc-tm-suggestion-hilite" style="cursor: default;">watch</span> <span class="gtc-tm-suggestion-hilite" style="cursor: default;">videos on your</span> Roku{/0}.</span><span class="bootstrap-wrapper" style="cursor: default;"><button class="label label-primary cth-T-switch-button" data-toggle="tooltip" title="" style="opacity: 0.5; position: relative; float: right; top: -2px; margin-left: 5px; cursor: default;" data-original-title="Toggle between new and old highlighting.">T</button></span></span>
<span class="gtc-tm-suggestion-translation-holder " style="cursor: default;"><span class="gtc-tm-suggestion-translation" style="cursor: default;">Bruk Google Play Filmer og TV-appen for å {0}se videoer på Roku{/0}.</span>
<span class="gtc-tm-suggestion-translator" style="cursor: default;">Oct 30, 2015
003********@003******.com</span>


<span class="gtc-tm-target-language" style="cursor: default;"></span>
<span id="2gtc-tm-rating-a246c9406449ca81;translation:1:0000000000000000:00000088f70474fe:16:^:;000523598365d600" class="gtc-tm-rating" style="cursor: default;"></span></span></div><div class="gtc-tm-suggestion-holder" style="cursor: default;"><span class="gtc-tm-suggestion-source-holder" style="cursor: default;"><span class="gtc-tm-suggestion-source" style="display: none; cursor: default;"><span class="gtc-tm-suggestion-hilite" style="cursor: default;">Watch</span> <span class="gtc-tm-suggestion-hilite" style="cursor: default;">videos on your TV</span> or computer</span>
<span class="gtc-tm-suggestion-message" style="cursor: default;">

<span style="cursor: default;"></span>
<span id="2gtc-tm-name-a246c9406449ca81;translation:1:0000000000000000:000000895da3e102:3:^:;0004f935d20804bd" style="cursor: default;">Source: Google Play TM</span></span><span class="bootstrap-wrapper cth-spacious" style="cursor: default;"><span class="cth-fuzzy label label-danger" style="color: white; cursor: default;">31%</span><br style="cursor: default;"></span><span style="cursor: default;"> </span><span style="cursor: default;"><span style="cursor: default;">Watch </span><ins style="background: rgb(204, 255, 204); cursor: default;">Google Play </ins><span style="cursor: default;">videos on your TV</span><del style="background: rgb(255, 204, 204); cursor: default;"> or computer</del></span><span style="display: none; cursor: default;"><span class="gtc-tm-suggestion-hilite" style="cursor: default;">Watch</span> <span class="gtc-tm-suggestion-hilite" style="cursor: default;">videos on your TV</span> or computer</span><span class="bootstrap-wrapper" style="cursor: default;"><button class="label label-primary cth-T-switch-button" data-toggle="tooltip" title="" style="opacity: 0.5; position: relative; float: right; top: -2px; margin-left: 5px; cursor: default;" data-original-title="Toggle between new and old highlighting.">T</button></span></span>
<span class="gtc-tm-suggestion-translation-holder " style="cursor: default;"><span class="gtc-tm-suggestion-translation" style="cursor: default;">Se videoer på TV-en eller datamaskinen din</span>
<span class="gtc-tm-suggestion-translator" style="cursor: default;">May 12, 2014
003********@003******.com</span>


<span class="gtc-tm-target-language" style="cursor: default;"></span>
<span id="2gtc-tm-rating-a246c9406449ca81;translation:1:0000000000000000:000000895da3e102:3:^:;0004f935d20804bd" class="gtc-tm-rating" style="cursor: default;"></span></span></div><div class="gtc-tm-suggestion-holder" style="cursor: default;"><span class="gtc-tm-suggestion-source-holder" style="cursor: default;"><span class="gtc-tm-suggestion-source" style="display: none; cursor: default;"><span class="gtc-tm-suggestion-hilite" style="cursor: default;">Play videos on</span> other devices</span>
<span class="gtc-tm-suggestion-message" style="cursor: default;">

<span style="cursor: default;"></span>
<span id="2gtc-tm-name-a246c9406449ca81;translation:1:0000000000000000:000000895da3e102:4:^:;0004f8f7ad6ed2a1" style="cursor: default;">Source: Google Play TM</span></span><span class="bootstrap-wrapper cth-spacious" style="cursor: default;"><span class="cth-fuzzy label label-danger" style="color: white; cursor: default;">31%</span><br style="cursor: default;"></span><span style="cursor: default;"> </span><span style="cursor: default;"><ins style="background: rgb(204, 255, 204); cursor: default;">Watch Google </ins><span style="cursor: default;">Play videos on </span><del style="background: rgb(255, 204, 204); cursor: default;">other devices</del><ins style="background: rgb(204, 255, 204); cursor: default;">your TV</ins></span><span style="display: none; cursor: default;"><span class="gtc-tm-suggestion-hilite" style="cursor: default;">Play videos on</span> other devices</span><span class="bootstrap-wrapper" style="cursor: default;"><button class="label label-primary cth-T-switch-button" data-toggle="tooltip" title="" style="opacity: 0.5; position: relative; float: right; top: -2px; margin-left: 5px; cursor: default;" data-original-title="Toggle between new and old highlighting.">T</button></span></span>
<span class="gtc-tm-suggestion-translation-holder " style="cursor: default;"><span class="gtc-tm-suggestion-translation" style="cursor: default;">Spill av videoer på andre enheter</span>
<span class="gtc-tm-suggestion-translator" style="cursor: default;">May 9, 2014
003********@003******.com</span>


<span class="gtc-tm-target-language" style="cursor: default;"></span>
<span id="2gtc-tm-rating-a246c9406449ca81;translation:1:0000000000000000:000000895da3e102:4:^:;0004f8f7ad6ed2a1" class="gtc-tm-rating" style="cursor: default;"></span></span></div><div class="gtc-tm-suggestion-holder" style="cursor: default;"><span class="gtc-tm-suggestion-source-holder" style="cursor: default;"><span class="gtc-tm-suggestion-source" style="display: none; cursor: default;"><span class="gtc-tm-suggestion-hilite" style="cursor: default;">Google Play videos</span> can only be watched <span class="gtc-tm-suggestion-hilite" style="cursor: default;">on {</span>0}supported devices{/0}.</span>
<span class="gtc-tm-suggestion-message" style="cursor: default;">

<span style="cursor: default;"></span>
<span id="2gtc-tm-name-a246c9406449ca81;translation:1:0000000000000000:00000088f70474fe:17:^:;00051191c2fecd50" style="cursor: default;">Source: Google Play TM</span></span><span class="bootstrap-wrapper cth-spacious" style="cursor: default;"><span class="cth-fuzzy label label-danger" style="color: white; cursor: default;">30%</span><br style="cursor: default;"></span><span style="cursor: default;"> </span><span style="cursor: default;"><ins style="background: rgb(204, 255, 204); cursor: default;">Watch </ins><span style="cursor: default;">Google Play videos </span><del style="background: rgb(255, 204, 204); cursor: default;">can only be watched on {0}supported devices{/0}.</del><ins style="background: rgb(204, 255, 204); cursor: default;">on your TV</ins></span><span style="display: none; cursor: default;"><span class="gtc-tm-suggestion-hilite" style="cursor: default;">Google Play videos</span> can only be watched <span class="gtc-tm-suggestion-hilite" style="cursor: default;">on {</span>0}supported devices{/0}.</span><span class="bootstrap-wrapper" style="cursor: default;"><button class="label label-primary cth-T-switch-button" data-toggle="tooltip" title="" style="opacity: 0.5; position: relative; float: right; top: -2px; margin-left: 5px; cursor: default;" data-original-title="Toggle between new and old highlighting.">T</button></span></span>
<span class="gtc-tm-suggestion-translation-holder " style="cursor: default;"><span class="gtc-tm-suggestion-translation" style="cursor: default;">Google Play-videoer kan bare spilles av på {0}støttede enheter{/0}.</span>
<span class="gtc-tm-suggestion-translator" style="cursor: default;">Mar 18, 2015
003********@003******.com</span>


<span class="gtc-tm-target-language" style="cursor: default;"></span>
<span id="2gtc-tm-rating-a246c9406449ca81;translation:1:0000000000000000:00000088f70474fe:17:^:;00051191c2fecd50" class="gtc-tm-rating" style="cursor: default;"></span></span></div><div class="gtc-tm-suggestion-holder" style="cursor: default;"><span class="gtc-tm-suggestion-source-holder" style="cursor: default;"><span class="gtc-tm-suggestion-source" style="display: none; cursor: default;"><span class="gtc-tm-suggestion-hilite" style="cursor: default;">On your TV: {</span>0}<span class="gtc-tm-suggestion-hilite" style="cursor: default;">Play</span> Music <span class="gtc-tm-suggestion-hilite" style="cursor: default;">on your TV</span> with Chromecast.{/0}</span>
<span class="gtc-tm-suggestion-message" style="cursor: default;">

<span style="cursor: default;"></span>
<span id="2gtc-tm-name-a246c9406449ca81;translation:1:0000000000000000:00000084e7dd8981:11:^:;00053cf432bea538" style="cursor: default;">Source: Google Play TM</span></span><span class="bootstrap-wrapper cth-spacious" style="cursor: default;"><span class="cth-fuzzy label label-danger" style="color: white; cursor: default;">28%</span><br style="cursor: default;"></span><span style="cursor: default;"> </span><span style="cursor: default;"><del style="background: rgb(255, 204, 204); cursor: default;">On your TV: {0}Play Music on your TV with Chromecast.{/0}</del><ins style="background: rgb(204, 255, 204); cursor: default;">Watch Google Play videos on your TV</ins></span><span style="display: none; cursor: default;"><span class="gtc-tm-suggestion-hilite" style="cursor: default;">On your TV: {</span>0}<span class="gtc-tm-suggestion-hilite" style="cursor: default;">Play</span> Music <span class="gtc-tm-suggestion-hilite" style="cursor: default;">on your TV</span> with Chromecast.{/0}</span><span class="bootstrap-wrapper" style="cursor: default;"><button class="label label-primary cth-T-switch-button" data-toggle="tooltip" title="" style="opacity: 0.5; position: relative; float: right; top: -2px; margin-left: 5px; cursor: default;" data-original-title="Toggle between new and old highlighting.">T</button></span></span>
<span class="gtc-tm-suggestion-translation-holder " style="cursor: default;"><span class="gtc-tm-suggestion-translation" style="cursor: default;">På TV: {0}Spill av musikk på TV-en med Chromecast{/0}.</span>
<span class="gtc-tm-suggestion-translator" style="cursor: default;">Sep 20, 2016
003********@003******.com</span>


<span class="gtc-tm-target-language" style="cursor: default;"></span>
<span id="2gtc-tm-rating-a246c9406449ca81;translation:1:0000000000000000:00000084e7dd8981:11:^:;00053cf432bea538" class="gtc-tm-rating" style="cursor: default;"></span></span></div><div class="gtc-tm-suggestion-holder" style="cursor: default;"><span class="gtc-tm-suggestion-source-holder" style="cursor: default;"><span class="gtc-tm-suggestion-source" style="display: none; cursor: default;"><span class="gtc-tm-suggestion-hilite" style="cursor: default;">Watch</span> HD <span class="gtc-tm-suggestion-hilite" style="cursor: default;">videos on your TV</span> screen with Apple <span class="gtc-tm-suggestion-hilite" style="cursor: default;">TV</span> using AirPlay.</span>
<span class="gtc-tm-suggestion-message" style="cursor: default;">

<span style="cursor: default;"></span>
<span id="2gtc-tm-name-a246c9406449ca81;translation:1:0000000000000000:00000088f70474fe:13:^:;000525e98eb4e9f0" style="cursor: default;">Source: Google Play TM</span></span><span class="bootstrap-wrapper cth-spacious" style="cursor: default;"><span class="cth-fuzzy label label-danger" style="color: white; cursor: default;">26%</span><br style="cursor: default;"></span><span style="cursor: default;"> </span><span style="cursor: default;"><span style="cursor: default;">Watch </span><del style="background: rgb(255, 204, 204); cursor: default;">HD</del><ins style="background: rgb(204, 255, 204); cursor: default;">Google Play</ins><span style="cursor: default;"> videos on your TV</span><del style="background: rgb(255, 204, 204); cursor: default;"> screen with Apple TV using AirPlay.</del></span><span style="display: none; cursor: default;"><span class="gtc-tm-suggestion-hilite" style="cursor: default;">Watch</span> HD <span class="gtc-tm-suggestion-hilite" style="cursor: default;">videos on your TV</span> screen with Apple <span class="gtc-tm-suggestion-hilite" style="cursor: default;">TV</span> using AirPlay.</span><span class="bootstrap-wrapper" style="cursor: default;"><button class="label label-primary cth-T-switch-button" data-toggle="tooltip" title="" style="opacity: 0.5; position: relative; float: right; top: -2px; margin-left: 5px; cursor: default;" data-original-title="Toggle between new and old highlighting.">T</button></span></span>
<span class="gtc-tm-suggestion-translation-holder " style="cursor: default;"><span class="gtc-tm-suggestion-translation" style="cursor: default;">Se videoer i HD på TV-skjermen med Apple TV via AirPlay.</span>
<span class="gtc-tm-suggestion-translator" style="cursor: default;">Dec 2, 2015
003********@003******.com</span>


<span class="gtc-tm-target-language" style="cursor: default;"></span>
<span id="2gtc-tm-rating-a246c9406449ca81;translation:1:0000000000000000:00000088f70474fe:13:^:;000525e98eb4e9f0" class="gtc-tm-rating" style="cursor: default;"></span></span></div><div class="gtc-tm-suggestion-holder" style="cursor: default;"><span class="gtc-tm-suggestion-source-holder" style="cursor: default;"><span class="gtc-tm-suggestion-source" style="display: none; cursor: default;"><span class="gtc-tm-suggestion-hilite" style="cursor: default;">On your TV: {</span>0}<span class="gtc-tm-suggestion-hilite" style="cursor: default;">Watch</span> movies <span class="gtc-tm-suggestion-hilite" style="cursor: default;">on your TV</span> with Chromecast{/0}.</span>
<span class="gtc-tm-suggestion-message" style="cursor: default;">

<span style="cursor: default;"></span>
<span id="2gtc-tm-name-a246c9406449ca81;translation:1:0000000000000000:00000084e7dd8981:15:^:;00053cf432bea538" style="cursor: default;">Source: Google Play TM</span></span><span class="bootstrap-wrapper cth-spacious" style="cursor: default;"><span class="cth-fuzzy label label-danger" style="color: white; cursor: default;">25%</span><br style="cursor: default;"></span><span style="cursor: default;"> </span><span style="cursor: default;"><del style="background: rgb(255, 204, 204); cursor: default;">On your TV: {0}Watch movies on your TV with Chromecast{/0}.</del><ins style="background: rgb(204, 255, 204); cursor: default;">Watch Google Play videos on your TV</ins></span><span style="display: none; cursor: default;"><span class="gtc-tm-suggestion-hilite" style="cursor: default;">On your TV: {</span>0}<span class="gtc-tm-suggestion-hilite" style="cursor: default;">Watch</span> movies <span class="gtc-tm-suggestion-hilite" style="cursor: default;">on your TV</span> with Chromecast{/0}.</span><span class="bootstrap-wrapper" style="cursor: default;"><button class="label label-primary cth-T-switch-button" data-toggle="tooltip" title="" style="opacity: 0.5; position: relative; float: right; top: -2px; margin-left: 5px; cursor: default;" data-original-title="Toggle between new and old highlighting.">T</button></span></span>
<span class="gtc-tm-suggestion-translation-holder " style="cursor: default;"><span class="gtc-tm-suggestion-translation" style="cursor: default;">På TV: {0}Se filmer på TV-en med Chromecast{/0}.</span>
<span class="gtc-tm-suggestion-translator" style="cursor: default;">Sep 20, 2016
003********@003******.com</span>


<span class="gtc-tm-target-language" style="cursor: default;"></span>
<span id="2gtc-tm-rating-a246c9406449ca81;translation:1:0000000000000000:00000084e7dd8981:15:^:;00053cf432bea538" class="gtc-tm-rating" style="cursor: default;"></span></span></div></div></div><div class="gtc-tool-right-floating" style="cursor: default;"><div class="gtc-tool-title gtc-tool-mt" style="cursor: default;">Computer Translation</div><div class="gtc-tool-content " style="cursor: default;"><div class="gtc-mt-suggestion-holder" style="cursor: default;"><span class="gtc-mt-suggestion" style="cursor: default;">Se på Google Play-videoer på TVen din</span>
</div></div><div class="gtc-tool-title gtc-tool-glossary" style="cursor: default;">Glossary (5)</div><div class="gtc-tool-content " style="cursor: default;"><div class="gtc-glossary-content-holder" style="cursor: default;"><div class="gtc-glossary-toolbox" id="gtc-gl-toolbox0" style="cursor: default;"><span class="gtc-glossary-toolbox-span" id="gtc-gl-toolbox-source0" style="background-color: rgb(207, 225, 255); cursor: default;"><a href="#" class="gtc-glossary-button" style="cursor: default;">Watches</a></span> <span class="gtc-glossary-toolbox-span" id="gtc-gl-toolbox-source1" style="background-color: rgb(207, 225, 255); cursor: default;"><a href="#" class="gtc-glossary-button" style="cursor: default;">Google Play</a></span> <span class="gtc-glossary-toolbox-span" id="gtc-gl-toolbox-source3" style="background-color: rgb(249, 234, 167); cursor: default;"><a href="#" class="gtc-glossary-button" style="cursor: default;">Play video</a></span> <span class="gtc-glossary-toolbox-span" id="gtc-gl-toolbox-source4" style="background-color: rgb(207, 225, 255); cursor: default;"><a href="#" class="gtc-glossary-button" style="cursor: default;">video</a></span> <span class="gtc-glossary-toolbox-span" id="gtc-gl-toolbox-source6" style="background-color: rgb(207, 225, 255); cursor: default;"><a href="#" class="gtc-glossary-button" style="cursor: default;">TV</a></span></div>
<div class="gtc-glossary-back-to-top" style="cursor: default;"><a href="#gtc-gl-toolbox0" style="cursor: default;">Back to top</a></div>
<div style="cursor: default;"><a href="#" id="gtc-glossary-terminology-button0" style="cursor: default;"><span class="gtc-glossary-terminology-dot" style="cursor: default;">&nbsp;</span>
<span class="gtc-glossary-type" style="cursor: default;">Terminology (4)</span>
<img src="./images/arrow.png" alt="" height="20" id="gtc-glossary-terminology-img0" class="gtc-glossary-arrow-up" style="cursor: default;"></a>
<div id="gtc-glossary-terminology-list0" class="gtc-glossary-list" style="cursor: default;"><ol style="cursor: default;"><li class="gtc-glossary-match-holder" style="cursor: default;"><span class="gtc-glossary-source" id="gtc-gl-source-2" style="cursor: default;">Google Play</span>
<span class="gtc-glossary-terms" style="cursor: default;"><span class="gtc-glossary-translation" style="cursor: default;">Google Play</span>
<span class="gtc-glossary-pos" style="cursor: default;">noun</span>
<span id="gtc-gl-name-2" class="gtc-glossary-source-name" style="cursor: default;">Source: <span style="color: blue; cursor: default;"><b style="cursor: default;">Product Names</b></span></span>
<span class="gtc-glossary-description" style="cursor: default;">Google Play refers to an entire ecosystem which includes purchase, playback, and storage features and functionality. Google Play includes verticals such as books, movies, music, and apps, and may include more forms of digital content in the near future.</span></span></li> <li class="gtc-glossary-match-holder" style="cursor: default;"><span class="gtc-glossary-source" id="gtc-gl-source-3" style="cursor: default;">Play video</span>
<span class="gtc-glossary-terms" style="cursor: default;"><span class="gtc-glossary-translation" style="cursor: default;">Spill av videoen</span>
<span id="gtc-gl-name-3" class="gtc-glossary-source-name" style="cursor: default;">Source: Photos</span></span></li> <li class="gtc-glossary-match-holder" style="cursor: default;"><span class="gtc-glossary-source" id="gtc-gl-source-6" style="cursor: default;">TV</span>
<span class="gtc-glossary-terms" style="cursor: default;"><span class="gtc-glossary-translation" style="cursor: default;">TV</span>
<span class="gtc-glossary-pos" style="cursor: default;">noun</span>
<span id="gtc-gl-name-6" class="gtc-glossary-source-name" style="cursor: default;">Source: Chrome</span>
<span class="gtc-glossary-description" style="cursor: default;">Short form of "Google Cast TV". Provides Google Cast functionality for television. NOTES: Please leave in English for all languages.</span></span></li> <li class="gtc-glossary-match-holder" style="cursor: default;"><span class="gtc-glossary-source" id="gtc-gl-source-4" style="cursor: default;">video</span>
<span class="gtc-glossary-terms" style="cursor: default;"><span class="gtc-glossary-translation" style="cursor: default;">video</span>
<span class="gtc-glossary-pos" style="cursor: default;">noun</span>
<span id="gtc-gl-name-4" class="gtc-glossary-source-name" style="cursor: default;">Source: <span style="color: blue; cursor: default;"><b style="cursor: default;">General</b></span></span>
<span class="gtc-glossary-description" style="cursor: default;">A media object with visual content; may or may not also have audio content.</span></span> <span class="gtc-glossary-source" id="gtc-gl-source-5" style="cursor: default;">videos</span>
<span class="gtc-glossary-terms" style="cursor: default;"><span class="gtc-glossary-translation" style="cursor: default;">videoer</span>
<span class="gtc-glossary-pos" style="cursor: default;">noun</span>
<span id="gtc-gl-name-5" class="gtc-glossary-source-name" style="cursor: default;">Source: Photos</span>
<span class="gtc-glossary-description" style="cursor: default;">Regular videos. Can be videos that you took using your phone, or videos imported from other sources.</span></span></li></ol></div></div>
<div style="cursor: default;"><a href="#" id="gtc-glossary-suggestion-button0" style="cursor: default;"><span class="gtc-glossary-suggestion-dot" style="cursor: default;">&nbsp;</span>
<span class="gtc-glossary-type" style="cursor: default;">Suggestions from Translation Memory (1)</span>
<img src="./images/arrow.png" alt="" height="20" id="gtc-glossary-suggestion-img0" style="cursor: default;"></a>
<div id="gtc-glossary-suggestion-list0" class="gtc-glossary-list" style="display: none; cursor: default;"><ol style="cursor: default;"><li class="gtc-glossary-match-holder" style="cursor: default;"><span class="gtc-glossary-source" id="gtc-gl-source-0" style="cursor: default;">Watches</span>
<span class="gtc-glossary-terms" style="cursor: default;"><span class="gtc-glossary-translation" style="cursor: default;">Sett</span>
<span class="gtc-glossary-pos" style="cursor: default;">noun</span>
<span id="gtc-gl-name-0" class="gtc-glossary-source-name" style="cursor: default;">Source: Google Plus</span>
<span class="gtc-glossary-description" style="cursor: default;">Plural noun. This comes from the verb “to watch”. Watches is a Google+ feature within Diary which shows all the videos that you have watched (from YouTube or Netflix, for example).</span></span></li></ol></div></div></div></div></div></div>`;
}
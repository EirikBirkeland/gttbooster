/**
 * Created by Eirik on 10.08.2017.
 */

/**
 * This function gets the current language
 * @returns {string|null}
 */
export default function getLanguageToUse () {
   const navigatorLanguage = navigator.language
   const dokumentSprak = window.cth.docInfo.dokumentSprak
   const hasOverride = window.cth.option.spellcheckOverride[0] && window.cth.option.spellcheckOverride[1]

   return hasOverride
      ? window.cth.option.spellcheckOverride[1]
      : dokumentSprak || navigatorLanguage
         ? navigatorLanguage
         : null
}

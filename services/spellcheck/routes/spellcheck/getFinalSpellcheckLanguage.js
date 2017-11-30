const Aspell = require('@eirikbirkeland/ob-aspell-lang-codes')

/**
 *
 * @param {Object} language
 * @param {String} language.override
 * @param {String} language.gtt
 * @param {String} language.navigator
 * @returns {string}
 */
module.exports = function getFinalSpellcheckLanguage(language) {
    /**
     * language.override will already be an Aspell code for now
     */
    const override = language.override

    /**
     * language.gtt is the raw code retrieved from GTT, so it's looked up in a table to first be converted to an Aspell code
     */
    const gtt = (() => {
        const a = Aspell.accountToAspellCodeConversionTable[language.gtt]
        return a && a.code && Aspell.aspellLangCodes.includes(a.code) ? a.code : null
    })()

    /**
     * language.navigator is the raw code retrieved from navigator.language in browser, so it's looked up in a table to first be converted to an Aspell code
     */
    const navigator = (() => {
        const a = Aspell.accountToAspellCodeConversionTable[language.navigator]
        return a && a.code && Aspell.aspellLangCodes.includes(a.code) ? a.code : null
    })()

    return override || gtt || navigator
}

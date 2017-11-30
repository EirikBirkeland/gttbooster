/**
 *
 * @param {string} str - a string to strip of punctuation
 */
module.exports = function stripPunctuation(str) {
    return str.replace(/[\\.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
        .replace(/[ ]{2,}/g, ' ')
        .replace(/["|']/g, '')
}
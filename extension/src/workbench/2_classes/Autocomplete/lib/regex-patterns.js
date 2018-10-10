/**
 * TODO: Simplify this description:
 * This pattern matches elements in the beginning of a string which should not be considered as part of the user's "intended" input. E.g. the user may have an input string of "(normally", but the "(" is irrelevant to the processing in both source.js and select.js. In the current implementation, this string-initial "(" is stripped off, the string is processed without it, and the "(" is reinserted at the end along with the term.
 * @type {RegExp}
 */
export const RE_FOR_PARTS_TO_IGNORE = /^[-{}()\[\]"«»]/

// TODO: If I change this regex to include -, then I can can autocompletion after hyphens, but will result in a crash.
export const RE_FOR_GETTING_WORD_BEFORE_CARET = /\s+/

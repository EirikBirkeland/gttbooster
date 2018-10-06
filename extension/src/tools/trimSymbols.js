import XRegExp from 'xregexp';

/**
 *
 * @param str
 * @param opts {Object}
 * @param opts.multiple {Boolean} - whether to strip multiple consecutive symbols (TODO: implement this option!)
 * @returns {void|string|_.LoDashExplicitWrapper<string>|XML|*}
 */
export function trimSymbols (str, opts) {
   const symbols = `\\p{Punctuation}` || `,.;:!?"`;
   const re = XRegExp(`^[${symbols}]|[${symbols}]$`);
   return XRegExp.replace(str, re, '', 'all');
}

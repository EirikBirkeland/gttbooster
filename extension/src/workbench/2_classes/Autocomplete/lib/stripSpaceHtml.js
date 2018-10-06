/**
 * It looks brittle, but it's been working for a long time.
 * @param {String} str
 */
export default function stripSpaceHtml (str) {
   return str.replace(/<span class="goog-gtc-inchars-highlight goog-gtc-inchars-space"> <\/span>/g, ' ').replace(/<span class="goog-gtc-inchars-space goog-gtc-inchars-highlight"> <\/span>/g, ' ').replace(/<span class="goog-gtc-inchars-highlight goog-gtc-inchars-space goog-gtc-highlight"> <\/span>/g, ' ');
}

import _ from 'lodash'
import $ from 'jquery'

/**
 *
 * @param nodes {NodeList} - a list of DOM nodes to normalize
 */
export default function normalizeTextNodes (nodes) {
   _.forEach($(nodes).find('.goog-gtc-translatable'), (ele) => ele.normalize())
}

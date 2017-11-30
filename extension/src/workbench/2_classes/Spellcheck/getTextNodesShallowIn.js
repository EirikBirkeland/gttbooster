import $ from 'jquery'

export default function getTextNodesShallowIn(el) {

   return $(el).filter((i, ele) => ele.nodeType === 3)

}

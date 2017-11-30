import $ from 'jquery'

export default function isScrolledIntoView(doc, elem) {

   const docViewTop = $(doc).scrollTop()
   const docViewBottom = docViewTop + $(doc).height()

   const elemTop = $(elem).offset().top
   const elemBottom = elemTop + $(elem).height()

   return elemBottom <= docViewBottom && elemTop >= docViewTop

}

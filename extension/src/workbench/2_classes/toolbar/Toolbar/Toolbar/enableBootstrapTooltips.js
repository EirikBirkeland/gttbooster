import $ from 'jquery'

export default function enableBootstrapTooltips() {

   function stuff() {

      $('[data-toggle="tooltip"]').tooltip({"html": true})
      $(window.cth.dom.bothDocs).find('[data-toggle="tooltip"]').tooltip({"html": true})

   }

   stuff()

   setTimeout(stuff, 2000)

}

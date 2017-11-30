import $ from 'jquery'

/**
 *
 * @param opts
 * @param {Array} opts.targetSegments
 * @param {Node} opts.$targetNode
 *
 */
function add(opts) {

   const {targetSegments, $targetNode} = opts

   const $bootstrap = $('<div/>').attr({"class": 'bootstrap-wrapper'})

   const bootstrapContents = `
                    <span class="progress">
                        <div class="progress-bar active" style="white-space: nowrap;" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="${targetSegments.length}">
                        </div>
                    </span>`

   $bootstrap.html(bootstrapContents)

   $bootstrap.attr({"id": 'cth-progress-container'})
   const br = $('<br/>')[0]
   $bootstrap.append(br)

   $targetNode.append($bootstrap)

}

/**
 *
 */
function remove() {

   const $prog = $('#cth-progress-container')
   if ($prog) {

      $prog.remove()

   }

}

/**
 *
 * @param i {number} - an index for the current segment being QA-ed
 * @param targetSegments {NodeList|Array} - a list of target segments
 */
function increment(i, targetSegments) {

   const width = (i + 1) / targetSegments.length * 100
   const widthRounded = Math.round(width * 10) / 10

   $('#cth-progress-container').find('.progress-bar').attr({'aria-valuenow': i + 1}).css({"width": `${widthRounded}%`}).html(`${widthRounded} %`)

}

export const ProgressBar = {
   add,
   remove,
   increment
}
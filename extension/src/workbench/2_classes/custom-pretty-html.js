// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 26.12.2016.
 */


function customPrettyHtml (diffs) {
   const DIFF_DELETE = -1
   const DIFF_INSERT = 1
   const DIFF_EQUAL = 0
   const html = []
   const patternAmp = /&/g
   const patternLt = /</g
   const patternGt = />/g
   const patternPara = /\n/g
   for (let i = 0; i < diffs.length; i++) {
      const op = diffs[i][0] // Operation (insert, delete, equal)
      const data = diffs[i][1] // Text of change.
      const text = data.replace(patternAmp, '&amp;').replace(patternLt, '&lt;').replace(patternGt, '&gt;').replace(patternPara, '&para;<br>')
      switch (op) {
         case DIFF_INSERT:
            html[i] = `<ins style="background:#ccffcc;">${text}</ins>`
            break
         case DIFF_DELETE:
            html[i] = `<del style="background:#ffcccc;">${text}</del>`
            break
         case DIFF_EQUAL:
            html[i] = `<span>${text}</span>`
            break
      }
   }
   return html.join('')
}

export {customPrettyHtml}

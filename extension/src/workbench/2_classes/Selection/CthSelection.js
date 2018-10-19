/**
 * Created by Eirik on 18.08.2017.
 */

export default function getCthSelection () {
   const obj = cth.dom.targetDoc.getSelection();

   /**
    *
    * @param {number} offset
    */
   obj.moveCaretToOffset = function moveCaretToOffset (offset) {
      for (let i = 0; i < offset; i++) {
         this.modify('move', 'right', 'character');
      }
   };
   return obj;
}

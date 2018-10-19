export function replaceTitle () {
   let docName = window.cth.docInfo.dokNavn.innerHTML;
   const numWords = window.cth.docInfo.antallOrd;
   docName = docName.replace(/no_(.*?)_([0-9]{6,})_.*/, '$2 $1');
   docName = docName.concat(` ${numWords}w`);

   document.title = docName;
}

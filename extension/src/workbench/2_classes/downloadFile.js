/*
 * @flow
 * Works very well
 */
export function downloadFile (fileName: string, content: string) {
   const a = document.createElement('a');
   const file = new Blob([content], { "type": 'text/xml' });
   a.href = URL.createObjectURL(file);
   a.download = fileName;
   a.click();
}

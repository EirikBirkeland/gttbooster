import $ from 'jquery';


const resetLoadIndication = () => {
   $(document.body).css('cursor', 'default')
   $(window.cth.dom.sourceDoc.body).css('cursor', 'default')
   $(window.cth.dom.targetDoc.body).find('*').css('cursor', 'default')
};
const showLoadIndication = () => {
   $(document.body).css('cursor', 'progress')
   $(window.cth.dom.sourceDoc.body).css('cursor', 'progress')
   $(window.cth.dom.targetDoc.body).css('cursor', 'progress')
};

export const Cursor = {
   resetLoadIndication,
   showLoadIndication
};
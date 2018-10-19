import $ from 'jquery';

const resetLoadIndication = () => $('*').css('cursor', 'default');
const showLoadIndication = () => $('*').css('cursor', 'progress');

export const Cursor = {
   resetLoadIndication,
   showLoadIndication
};
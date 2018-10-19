import $ from 'jquery';

export const top = {
   "headerArea": $('#wbheader').get(0),
   // The black bar
   "topNavBar": $('#gtc-gaiabar').get(0),
   "docTitleRow": $('#doctitlebar').get(0),
   // If you append something here, it will be added to the toolbar itself
   "existingToolbarRow": $('.gtc-toolbar').get(0),
   // If you append something here, it will appear just below the existingToolbar
   "existingToolbarRowContainer": $('#wbmenu').get(0),
};
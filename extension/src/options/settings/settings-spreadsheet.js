import {ChromeProxy} from '../../model/ChromeProxy'

export const spreadsheetSettings = {
   "spreadsheetURL": {
      "default": 'https://docs.google.com/spreadsheets/d/1ejopeR9b0sxK73-R0vK6DWx2rLsUscuhkfz--FGNr3I/edit?usp=sharing',
      "description": 'URL or key name for Google Spreadsheet workbook',
      "tooltip": 'Add a spreadsheet URL if you wish to include your very own custom language checks.',
      "defaultInputText": 'Please input the full public URL, or just the key itself.',
      "type": 'text'
   },
   "sheetName": {
      "default": 'Main',
      "description": 'Enter the name of the sheet/tab you wish to use.',
      "tooltip": '',
      "defaultInputText": 'Sheet name',
      "imageUrl": ChromeProxy.runtime.getURL('img/sheetnames.png'),
      "popoverHeader": 'Where to find tab name – example',
      "type": 'text'
   },
   "sheetNames": {
      "default": [
         true,
         ''
      ],
      "description": '',
      "tooltip": '',
      "defaultInputText": '',
      "values": [] // I would like to be able to replace these values by retrieving from spreadsheet
   },
   "displaySpreadsheetNotifications": {
      "default": false,
      "description": 'Display highly visible spreadsheet notifications in GTT if any issues are encountered.',
      "tooltip": 'Disable this if messages in the upper right corner are distracting you. Notifications will still be available in the console by pressing <kbd>CTRL+SHIFT+I</kbd>.'
   }
}
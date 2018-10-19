// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 03.08.2016.
 */
const debug = require('cth-debug')(__filename);

import {autocompleteSettings} from './settings/settings-autocomplete';
import {languageSpecificQaSettings, qaSettings} from './settings/settings-qa';
import {spreadsheetSettings} from './settings/settings-spreadsheet';
import {spellcheckSettings} from './settings/settings-spellcheck';
import {translationConsoleSettings} from './settings/settings-translationConsole';

const otherSettings = {
   "newHighlightingStyle": {
      "default": true,
      "description": 'New highlighting style in TM view',
      "tooltip": 'Use a new before/after highlighting style in the TM view'
   },
   "newGlossaryExpirationTime": {
      "default": [
         true,
         7
      ],
      "description": '"NEW" glossaries expiration time',
      "tooltip": 'Number of days before removing the NEW tag from individual glossary items after seeing them.'
   },
   "normalizeDiacritics": {
      "default": true,
      "description": 'Streamline diacritics for keyword highlighting',
      "tooltip": 'If checked, will allow you to match characters similar to those you searched for in the source or target text filter. For example: á will match a, å, and other similar characters.'
   },
   "wrongCapitalization": {
      "default": true,
      "description": 'Different capitalization'
   },
   "highlightTextItems": {
      "default": true,
      "description": 'Highlight important items in descriptions',
      "tooltip": 'Includes items such as character limitations and \'scope of the API\''
   },
   "addShortcutCtrlB": {
      "default": true,
      "description": 'Allow use of CTRL-B shortcut to hide upper part of interface'
   },
   "addNewDocname": {
      "default": true,
      "description": 'Enhance the document name for easy copy/pasting of individual elements'
   },
   "replaceTitle": {
      "default": true,
      "description": 'Replace the browser tab name with relevant information',
      "tooltip": 'If checked, the browser tab\'s title is replaced with useful information such as the title of the document being translated and the word count.'
   },
   "removeDuplicates": {
      "default": true,
      "description": 'Remove duplicate glossaries',
      "tooltip": 'Patches the issue with identical glossaries repeated multiple times'
   },
   "lowSeverity": {
      "default": '7AFFBD',
      "description": 'Color for low severity QA errors'
   },
   "medSeverity": {
      "default": 'FFF6C4',
      "description": 'Color for medium severity QA errors'
   },
   "highSeverity": {
      "default": 'FFCFC4',
      "description": 'Color for high severity QA errors'
   },
   "noSeverity": {
      "default": 'C7F2FF',
      "description": 'Color for no severity specified QA errors'
   },
   "descHighlight": {
      "default": 'FF8C00',
      "description": 'Color for highlighting important items in segment descriptions',
      "override": 'jscolor'
   },
   "timerEnable": {
      "default": true,
      "description": 'Display the timer',
      "tooltip": 'May allow for simpler timekeeping'
   },
   "disableIceQa": {
      "default": true,
      "description": 'Disable checking of ICE segments',
      "tooltip": 'If checked, omits ICE segments from QA'
   },
   "removeMt": {
      "default": false,
      "description": 'Remove "Computer Translation" text from the toolkit',
      "tooltip": 'This will increase vertical space for glossaries'
   },
   "lockEnable": {"default": true},
   "autoSave": {
      "default": true,
      "tooltip": 'While this is active, any changes will be saved automatically.'
   }
};

const settings = {
   ...languageSpecificQaSettings,
   ...autocompleteSettings,
   ...spellcheckSettings,
   ...spreadsheetSettings,
   ...qaSettings,
   ...otherSettings,
   ...translationConsoleSettings
};

const defaults = Object.keys(settings).reduce((acc, ele) => {
   acc[ele] = settings[ele].default;
   return acc;
}, {});

export {settings, defaults};
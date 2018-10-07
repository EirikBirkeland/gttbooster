/* global chrome */
// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 03.09.2016.
 */

import $ from 'jquery';
import React from 'react';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import config from '@eirikbirkeland/ob-config';
import { replaceFuzzyWithSource, replaceMtWithSource } from '../../../5_init/util';
import { TargetDocument } from '../../Document/Document';
import { timer as initTimer } from '../../upper-lib/timer';
import listenForClick from '../../click-logging';
import { KeywordFiltering } from '../../KeywordFiltering/KeywordFiltering';
import TransEditor from '../../TransEditor';
import { Font } from '../../Font/Font';
import { Cursor } from '../../Cursor';
import { qaSheet } from '../../Qa/qa-sheet';
import changeReport from '../../ChangeReport/ChangeReport';

import Button from './components/Button';
import Input from './components/Input';

import checkIfGlossaryWindowExistsAndActivate from './checkIfGlossaryWindowExistsAndActivate';
import enableBootstrapTooltips from './Toolbar/enableBootstrapTooltips';
import Toggles from './toggles';

const debug = require('cth-debug')(__filename);

// TODO: Get rid of IDs
class Toolbar extends React.Component {
   componentDidMount () {
      checkIfGlossaryWindowExistsAndActivate();

      if (window.cth.option.spreadsheetURL === '') {
         debug.log('OK');
         const $loadSheetButton = $('#cth_loadSheetButton').attr('title', 'Please specify a spreadsheet in the options screen');
         // ChangeOpacity($loadSheetButton, 0.3)
         $loadSheetButton.off();
      }

      enableBootstrapTooltips();

      if (window.cth.option.autocompleteOnByDefault) {
         Toggles.autocomplete();
      }

      if (localStorage['cth-ice-lock'] === 'true') {
         Toggles.lockIce();
      }

      const targetDocument = TargetDocument;

      if (localStorage['cth-merge-panes'] === 'true' &&
         targetDocument.isShort()) {
         Toggles.mergePanes();
      }

      KeywordFiltering.run();

      /**
       * Add click logging for all items
       */
      const toolbarItems = $(this.main).children();
      toolbarItems.each((i, ele) => {
         $(ele).bind('click', listenForClick);
      });

      if (window.cth.option.timerEnable === false) {
         $('#cth_timerButton').hide();
      } else {
         initTimer();
      }

      if (!targetDocument.hasMessageBlocks()) {
         $('#cth_descButton').children(0).css({ "opacity": 0.3 });
      }

      if (!targetDocument.hasIceSegments()) {
         $('#cth_lockIceButton').hide();
      }
   }

   render () {
      const hasMessageBlocks = $(window.cth.dom.targetDoc).find('.goog-gtt-messageblock').length;

      return (
         <span
            ref={(node) => {
               this.main = node;
            }}
            className="btn-group"
         >
          <Input
             id="cth_searchSourceField"
             title="Input source phrase to filter and click enter..."
             value="Source"
             className="unselectable"
          />
            <Button
               id="cth_wholeQaButton"
               title="Run QA checks (keep it on to check while translating)"
               iconName="binocularsOffState"
               onClick={Toggles.qa}
            />
            <Button
               id="cth_insertButton"
               title="Switch to combined view (proofreading mode)"
               iconName="sourceArrowOffState"
               onClick={Toggles.mergePanes}
            />
            <Button
               id="cth_tradosButton"
               title="Display English above segment being translated"
               iconName="tradosOffState"
               onClick={Toggles.trados}
            />
          <Button
             id="cth_descButton"
             title={hasMessageBlocks ? 'Compressed view' : 'Toggle meta disabled for this document – no applicable data found. Please use the segment filtering feature to selectively hide meta data.'}
             iconName="descriptionsOffState"
             onClick={Toggles.hideMeta}
          />
          <Button
             id="cth_glossaryWindowButton"
             title="Open glossaries in separate window"
             iconName="windowPlus"
             onClick={Toggles.sendGlossariesToBackground}
          />
          <Input
             id="cth_searchTargetField"
             title="Input target phrase to filter and click enter..."
             value="Target"
             className="unselectable"
          />
          <Button
             id="cth_incrFontButton"
             title="Increase font size"
             iconName="plus"
             onClick={function () {
                Font.resize('incr');
             }}
          />
          <Button
             id="cth_decrFontButton"
             title="Decrease font size"
             iconName="minus"
             onClick={function () {
                Font.resize('decr');
             }}
          />
            <Button
               id="cth_autocompleteButton"
               title="Autocompletion / predictive typing"
               iconName="autocompletionGrey"
               onClick={Toggles.autocomplete}
            />
          <Input
             id="cth_timerButton"
             title="Click to start or pause. Double-click to reset"
             value="00:00:00"
             className="unselectable"
          />
            <Button
               id="cth_loadSheetButton"
               title="Reload spreadsheet"
               iconName="arrowCircleLarge"
               onClick={function () {
                  Cursor.showLoadIndication();

                  /**
                   * Reset after a while in case the spreadsheet fails to load and throws and uncatchable error.
                   */
                  setTimeout(Cursor::Cursor.resetLoadIndication, 5000);
                  qaSheet(() => {
                     Cursor.resetLoadIndication();
                  });
               }}
            />
          <Button
             id="cth_settingsButton"
             title="Load settings screen"
             iconName="settings"
             onClick={function () {
                chrome.runtime.sendMessage({ "header": 'openOptionsPage' });
             }}
          />
         {/*// TODO(eirik): migrate the Knowledge Base to be included with the extension*/}
         {/*<Button
             id="cth_helpButton"
             title="Open the knowledge base"
             iconName="question"
             onClick={function () {
                window.open(config.BASE_URL)
             }}*/}
          <Button
             id="cth_focusbutton"
             title="SmartFocus: (1) go to first untranslated segment from the top, or (2) bring any active segment into view."
             iconName="arrowIn"
             onClick={TransEditor.scrollTo}
             style={{ "borderColor": 'green' }}
          />
          <Button
             id="cth_lockIceButton"
             title="Lock all ICE segments, preventing accidental editing - applies globally."
             iconName="lockIceOffState"
             onClick={Toggles.lockIce}
          />
            {localStorage['cth-dev-mode'] === 'true'
               ? <DropdownButton
                  id="cth-dropdown"
                  style={{
                     "paddingTop": '5px',
                     "paddingRight": '10px',
                     "paddingBottom": '5px',
                     "paddingLeft": '10px'
                  }}
                  title="DEV"
                  dropup
               >
                  <MenuItem onClick={replaceMtWithSource} eventKey="1">Copy source to MT</MenuItem>
                  <MenuItem onClick={replaceFuzzyWithSource} eventKey="2">Copy source to fuzzies</MenuItem>
                  <MenuItem onClick={changeReport.toggle.bind(changeReport)} eventKey="3">Toggle ChangeReport</MenuItem>
               </DropdownButton>
               : ''}
        </span>
      );
   }
}

export default Toolbar;

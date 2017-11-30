/* eslint-env browser, webextensions */
// Copyright © 2016 Eirik Birkeland. All rights reserved.

import CompletionCheck from './runCompletionCheck/Completion'
import _ from 'lodash'

const debug = require('cth-debug')(__filename.replace(/^src\//, ''))

export function runCompletionCheck() {

   const docStatus = new CompletionCheck()
   // 1. update projectStatus with current project's state:
   docStatus.retrieveStatusFromDocument().// 2. Change icon according to completion state
   changeIconAccordingToCompletionState().// 3. update Storage with the changed object
   updateStorage()

   // 4. Listen for status change by monitoring the menu ...
   _.delay(docStatus.observeForStatusChange.bind(docStatus), 1000)

}

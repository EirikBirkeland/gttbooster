// Copyright © 2017 Eirik Birkeland. All rights reserved.
/**
 * Created by Eirik on 13.07.2017.
 */

import {load, retrieveSegmentStatuses, save} from './segment-status/index'

let segmentStatuses

function initFuncToRunOnPageLoad() {

   if ('page was last edited by clob' &&
      'doc has not already been saved') {

      segmentStatuses = retrieveSegmentStatuses(cth.dom.targetDoc)
      save(segmentStatuses)

   } else if ('doc has already been saved') {

      segmentStatuses = load()

   } else {
      // Appropriate pre-conditions not found. Not proceeding.
   }

}

// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 26.08.2016.
 */

import GoogleDiff from 'diff-match-patch';
import {icons} from '../2_classes/icons';
import Calculate from '../../otherPages/calculateLqe';
import compareLengths from '../2_classes/Qa/checks/compareLengths';
import consistencyCheck from '../2_classes/Qa/checks/consistencyCheck';
import {convertPlaceholders} from '../2_classes/Segment/convertPlaceholders';
import coreTests from '../2_classes/Qa/checks/coreChecks';
import {notifier} from '../2_classes/notifier';
import PlaceholderCheck from '../2_classes/Qa/checks/checkPlaceholders';
import {buildObject, Glossaries} from '../2_classes/Glossaries/Glossaries';
import {Spellcheck} from '../2_classes/Spellcheck/Spellcheck';
import filterSegmentTypes from '../2_classes/SegmenttypeFiltering/segmenttype-filtering';
import {Segment} from '../2_classes/Segment/Segment';
import {scrollTo} from '../2_classes/TransEditor/scrollTo';
import {TransEditor} from '../2_classes/TransEditor/TransEditor';
import {SourceDocument, TargetDocument} from '../2_classes/Document/Document';
import {customPrettyHtml} from '../2_classes/custom-pretty-html';
import {ChangeReport} from '../2_classes/ChangeReport/ChangeReport';

export {
   Calculate,
   compareLengths,
   consistencyCheck,
   convertPlaceholders,
   coreTests,
   Glossaries,
   buildObject,
   icons,
   notifier,
   PlaceholderCheck,
   Spellcheck,
   filterSegmentTypes,
   Segment,
   scrollTo,
   TransEditor,
   SourceDocument,
   TargetDocument,
   GoogleDiff,
   customPrettyHtml,
   ChangeReport
};

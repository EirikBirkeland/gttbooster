// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 26.08.2016.
 */

import GoogleDiff from 'diff-match-patch';
import { icons } from 'workbench/2_classes/icons';
import Calculate from '../../otherPages/calculateLqe';
import compareLengths from 'workbench/2_classes/Qa/checks/compareLengths';
import consistencyCheck from 'workbench/2_classes/Qa/checks/consistencyCheck';
import { convertPlaceholders } from 'workbench/2_classes/Segment/convertPlaceholders';
import coreTests from 'workbench/2_classes/Qa/checks/coreChecks';
import { notifier } from 'workbench/2_classes/notifier';
import PlaceholderCheck from 'workbench/2_classes/Qa/checks/checkPlaceholders';
import { buildObject, Glossaries } from 'workbench/2_classes/Glossaries/Glossaries';
import { Spellcheck } from 'workbench/2_classes/Spellcheck/Spellcheck';
import filterSegmentTypes from 'workbench/2_classes/SegmenttypeFiltering/segmenttype-filtering';
import { Segment } from 'workbench/2_classes/Segment/Segment';
import TransEditor from 'workbench/2_classes/TransEditor';
import { SourceDocument, TargetDocument } from 'workbench/2_classes/Document/Document';
import { customPrettyHtml } from 'workbench/2_classes/custom-pretty-html';
import { ChangeReport } from 'workbench/2_classes/ChangeReport/ChangeReport';

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
   TransEditor,
   SourceDocument,
   TargetDocument,
   GoogleDiff,
   customPrettyHtml,
   ChangeReport
};

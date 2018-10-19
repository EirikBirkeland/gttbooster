// @flow
import $ from 'jquery';
import _ from 'lodash';
import { Segment } from '../Segment/Segment';
import runChecks from './runChecks';
import { Spellcheck } from '../Spellcheck/Spellcheck';

const debug = require('cth-debug')(__filename);
// TODO: Well this should be moved to somewhere else, for sure! I.e. an event "user-keyboard-input" in the bodyEmitter.

export default function checkCurrentSegment (): void {
   const cachedSourceId = window.cth.dom.currentSourceSegment.id;
   const cachedTargetId = window.cth.dom.currentTargetSegment.id;
   debug.log('Keyup events registered');
   debug.log('Running single qa');
   const source = [$(window.cth.dom.sourceDocClone).find(`#${cachedSourceId}`)[0]];
   const target = [$(window.cth.dom.targetDoc).find(`#${cachedTargetId}`)[0]];

   const src = Segment.create(source[0]);

   if (src.hasDuplicates) { // Integrate this with Segment if possible
      const indices = src._duplicateIndices;
      _.forEach(indices, (ele) => {
         // Maybe: revert to sourceDocClone? I may have to fix some stuff.
         source.push($(window.cth.dom.sourceDocClone).find(`#goog-gtc-unit-${ele + 1}`)[0]);
         target.push($(window.cth.dom.targetDoc).find(`#goog-gtc-unit-${ele + 1}`)[0]);
      });
   }

   /**
    * TODO:
    * As ugly as these timers look, they avoid the problem of a single 500 ms debounce sometimes not working - perhaps because the DOM has not been updated with the TransEditor (which is probably itself on a less than optimal internal debouncer).
    */
   /**
    * Yes, and this can be 'finally fixed' by retrieving the live innerHTML of the transEditor, and using that as input instead. The problem is that I'm in the process of rewiring QA to take Segment instances. However, I could possibly do some trickery later and do a special 'dummy Segment' (perhaps a subclass called DummySegment) which somehow retrieves the innerHTML of the transEditor, but otherwise acts in a way that is compatible with Segment.
    */
   runChecks({
      "sourceSegments": source,
      "targetSegments": target
   });

   _.delay(() => {
      runChecks({
         "sourceSegments": source,
         "targetSegments": target
      });

      _.delay(() => {
         runChecks({
            "sourceSegments": source,
            "targetSegments": target
         }, () => {
            if (window.cth.option.spellcheckEnabled) {
               Spellcheck.run(target);
            }
         });
      }, 500);
   }, 500);
}

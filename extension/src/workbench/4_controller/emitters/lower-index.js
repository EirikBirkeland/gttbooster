/**
 * Created by Eirik on 15.07.2017.
 */
/**
 *  This file should concern itself ONLY with the lower part of the page.
 */
import { tmChangeObserver } from '../observers/lower-tmChangeObserver';
import { glossaryChangeObserver } from '../observers/lower-glossaryChangeObserver';
import lowerEmitter from './lowerEmitter';

const debug = require('cth-debug')(__filename);

require('../lower-init');
require('../lower-glossary-changed');
require('../lower-tm-changed');

lowerEmitter.initListeners = function () {
   tmChangeObserver.init(() => {
      lowerEmitter.emit('tm-changed');
   });

   glossaryChangeObserver.init(() => {
      lowerEmitter.emit('glossary-changed');
   });
};

function init () {
   lowerEmitter.emit('init');
   lowerEmitter.initListeners();
}

export { init, lowerEmitter };

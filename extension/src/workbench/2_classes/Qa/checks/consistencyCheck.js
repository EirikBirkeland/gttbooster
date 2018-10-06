// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 2016/02/27.
 */

import _ from 'lodash';

const debug = require('cth-debug')(__filename.replace(/^src\//, ''));

// TODO: Add support for toString()

const consistencyCheck = (function () {
   const cs = {};

   /**
    *
    * @param {number} indexToTest - index of segment to test
    * @param {String[]} sourceArr - an array of strings
    * @param {String[]} targetArr - an array of strings
    * @returns {*}
    */
   cs.init = function (indexToTest, sourceArr, targetArr) {
      this.indexToTest = indexToTest;
      this.sourceArr = sourceArr;
      this.targetArr = targetArr;
      this.dupeSegIds = [];
      this.inconsistentIds = [];
      this._calcResults();
      return this;
   };

   cs.getResults = function () {
      const toRet = this.inconsistentIds.length > 0 ? this.inconsistentIds : null;
      return {"inconsistentIds": toRet};
   };

   cs.getReport = function () {
      if (this.inconsistentIds.length === 1) {
         return `Segment ${this.inconsistentIds[0] + 1} is inconsistent with this segment (${this.indexToTest + 1}).`;
      }
      if (this.inconsistentIds.length > 1) {
         return `Segment(s) ${this.inconsistentIds.map((ele) => ele + 1).join(', ')} are inconsistent with this segment (${this.indexToTest + 1}).`;
      }
      return null; // "No inconsistent ids found"
   };

   cs._checkNotEqual = function () {
      _.forEach(this.dupeSegIds, (ele) => {
         if (this.targetArr[this.indexToTest] !== this.targetArr[ele]) {
            debug.log('Pushing ID to inconsistentIds');
            this.inconsistentIds.push(ele);
         }
      });
   };
   cs._getDupes = function () {
      this.dupeSegIds = [];
      _.forEach(this.sourceArr, (ele, i) => {
         if (i !== this.indexToTest &&
            this.sourceArr[i] === this.sourceArr[this.indexToTest]) {
            debug.log('Adding a dupe to accumulator');
            this.dupeSegIds.push(i);
         }
      });
   };
   cs._hasDupes = function () {
      let hasDupe = false;
      _.forEach(this.sourceArr, (ele, i) => {
         if (i !== this.indexToTest &&
            this.sourceArr[i] === this.sourceArr[this.indexToTest]) {
            hasDupe = true;
         }
      });
      return hasDupe;
   };
   cs._calcResults = function () {
      if (this._hasDupes()) {
         this._getDupes();
         if (this.dupeSegIds.length > 0) {
            this._checkNotEqual();
         } else {
            debug.log('No dupes');
         }
      }
   };
   return cs;
}());

export default consistencyCheck;
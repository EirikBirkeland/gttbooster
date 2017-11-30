import {completeAssign} from '../../model/completeAssign'
import {top} from './lib/upper'
import {body} from './lib/body'
import {bottom} from './lib/bottom'

const debug = require('cth-debug')(__filename.replace(/^src\//, ''))

// GOAL: React-level legibility. Make simple!

export function getDomRefs () {
   const obj = completeAssign(...top, ...body, ...bottom)
   return obj
}

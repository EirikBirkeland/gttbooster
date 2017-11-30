// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 26.09.2016.
 */
'use strict'

String.prototype.startsWithUppercase = function () {
  return this[0].toUpperCase() === this[0]
}

String.prototype.startsWithLowercase = function () {
  return this[0].toLowerCase() === this[0]
}

String.prototype.upperFirst = function () {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

String.prototype.lowerFirst = function () {
  return this.charAt(0).toLowerCase() + this.slice(1)
}

String.prototype.clean = function () {
  return this.replace(/\s*\r?\n\s*/g, '')
}

Array.prototype.concatAll = function () {
  return this.reduce((acc, cur) => acc.concat(cur))
}

Array.prototype.arrToObj = function () {
  const newObj = {}
  this.forEach(ele => {
    newObj[ele] = 1
  })
  return newObj
}

Array.prototype.uniq = function () {
  return this.filter((ele, i) => this.indexOf(ele) === i)
}

Array.prototype.truthy = function () {
  return this.filter(ele => Boolean(ele))
}

Array.prototype.forEachAsync = function recurFn(cb, delay = 0, index = 0) {
  if (typeof this !== 'object') {
    return console.error('Can only iterate an array or array-like! You provided an item of type ' + typeof this)
  }
  if (this[index]) {
    cb(this[index], index, this)
  }
  if (this.length) {
    setTimeout(recurFn.bind(this, cb.bind(this), delay, ++index), delay)
  }
}

// Same as in Java!
String.prototype.hashCode = function () {
  let hash = 0,
    i, chr, len
  if (this.length === 0) {
    return hash
  }
  for (i = 0, len = this.length; i < len; i++) {
    chr = this.charCodeAt(i)
    hash = ((hash << 5) - hash) + chr
    hash |= 0 // Convert to 32bit integer
  }
  return hash
}

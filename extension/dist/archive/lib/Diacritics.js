// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 04.09.2016.
 */
'use strict'
const $ = require('jquery')
const _ = require('lodash')

const diacriticsList = Object.freeze([
  'aÀÁÂÃÄÅàáâãäåĀāąĄ',
  'cÇçćĆčČ',
  'dđĐďĎ',
  'eÈÉÊËèéêëěĚĒēęĘ',
  'iÌÍÎÏìíîïĪī',
  'lłŁ',
  'nÑñňŇńŃ',
  'oÒÓÔÕÕÖØòóôõöøŌō',
  'rřŘ',
  'sŠšśŚ',
  'tťŤ',
  'uÙÚÛÜùúûüůŮŪū',
  'yŸÿýÝ',
  'zŽžżŻźŹ'
])

function normalizeDiacritics(str) {
  diacriticsList.forEach(ele => {
    const re = new RegExp(`[${ele}]`, 'ig')
    if (str.match(re)) {
      str = str.replace(re, `[${ele}]`)
    }
  })
  return str
}

export const Diacritics = {
  normalizeDiacritics, diacriticsList
}
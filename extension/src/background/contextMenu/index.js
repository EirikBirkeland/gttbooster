/* global chrome */
import {handleTcRequest} from '../handleTcRequest'

const debug = require('cth-debug')(__filename)

/*
 * Copyright (c) 2010 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * Found in the LICENSE file.
 */

// Create one test item for each context type.
const contexts = ["selection"]
const title = "Look up phrase in Translation Console"

chrome.contextMenus.create({
   title,
   contexts,
   "onclick": handleTcRequest
})
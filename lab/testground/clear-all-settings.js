// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 29.11.2016.
 */
'use strict'

export default function clearAllSettings() {
    localStorage.clear()
    chrome.storage.sync.clear()
    chrome.storage.local.clear()
}
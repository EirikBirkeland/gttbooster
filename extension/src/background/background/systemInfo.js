// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 25.02.2017.
 */

/* global chrome */


function getCpuInfo(cb) {

   chrome.system.cpu.getInfo(cb)

}

function getMemInfo(cb) {

   chrome.system.memory.getInfo(cb)

}

export {getCpuInfo, getMemInfo}

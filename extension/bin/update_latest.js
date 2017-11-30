/*
 * Update_latest.js
 * Copyright (C) 2016 Eirik Birkeland
 */
'use strict'
const fs = require('fs')

function getManifestVersion() {
  const file = fs.readFileSync('manifest.json', 'utf8')
  const json = JSON.parse(file)
  return json.version
}

function updateLatestJson(updateMessage) {
  const latest = fs.readFileSync('public/latest.json')
  const json = JSON.parse(latest)
  json.version = getManifestVersion()
  json.available = updateMessage || json.available

  fs.writeFileSync('public/latest.json', JSON.stringify(json, null, 4))
}

module.exports = {getManifestVersion, updateLatestJson}

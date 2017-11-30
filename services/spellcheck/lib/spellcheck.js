/*
 * typotest.js
 * Copyright (C) 2016 Eirik Birkeland
 */
"use strict";

const exec = require('child_process').exec

function spellcheck(text, language, cb){
   text = text.replace(/^/, "^").replace(/'/g, "")
   const command = `echo "${text}" | tr -s '[[:punct:][:space:]]' '\n' | sort | uniq | aspell list -l '${language}' | tr -s '\n' ' ' | perl -pe 's/^\\s+|\\s+$//g;'`
   exec(command, (err, stdout, stderr) => {
      if(err){
         console.error(`exec error: ${err}`)
         return
      }
      if(stderr) console.log(`stderr: ${stderr}`)
      cb(stdout || null)
   })
}

module.exports = spellcheck

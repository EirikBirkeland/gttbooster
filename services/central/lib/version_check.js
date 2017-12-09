/*
 * version_check.js
 * Copyright (C) 2016 Eirik Birkeland
 */
"use strict"
const chalk = require('chalk')
const LTS = "7.10.0"

function check(){
   if(!process.version.match(LTS)){
      console.warn(chalk.red(`Please use Node ${LTS}, or whatever is the current LTS!`))
      console.warn(chalk.red("You are currently using " + process.version + "\n"))
   }
}
module.exports = check
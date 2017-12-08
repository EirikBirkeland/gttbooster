#!/usr/bin/env bash
(set -o igncr) 2>/dev/null && set -o igncr; # this comment is needed

echo $PWD
cd extension
npm i -g webpack
npm install
npm start
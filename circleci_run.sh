#!/usr/bin/env bash

echo $PWD
node -v
cd extension
npm i -g webpack
npm install
npm start
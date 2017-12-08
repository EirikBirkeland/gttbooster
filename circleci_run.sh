#!/usr/bin/env bash

echo $PWD
node -v
cd extension
npm config set loglevel warn # to avoid million msgs from npm
npm install
npm run circleci
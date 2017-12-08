#!/usr/bin/env bash

echo $PWD
node -v
cd extension
npm install --silent
npm run circleci
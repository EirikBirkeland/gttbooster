#!/usr/bin/env bash

echo $PWD
node -v
cd extension
npm install --loglevel=warn
npm run circleci
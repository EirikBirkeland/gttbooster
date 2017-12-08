#!/usr/bin/env bash

echo $PWD
node -v
cd extension
npm install --loglevel=info
npm run circleci
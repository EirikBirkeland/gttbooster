#!/usr/bin/env bash

cd services/central && npm install --loglevel=warn
npm start > /dev/null &
sleep 5 && npm run test
#!/usr/bin/env bash

cd services/central && npm install --loglevel=warn
npm start &
sleep 5 && npm run test
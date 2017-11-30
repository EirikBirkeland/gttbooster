#!/bin/bash
curl -H 'Content-Type: application/json' -X POST -d '{"text": {"data": "'"$1"'", "compressionOption": false}, "language": "no"}' "$2"

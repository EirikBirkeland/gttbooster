#!/bin/bash
gulp zipAndManifestDEV
cd dist
rm -Rf ./archive
echo "Unzipping archive.zip to dist/archive"
unzip -q archive.zip -d archive
#!/bin/bash

function hue {
   which philipsHue.sh
   if [ $? -eq 0 ]; then
     philipsHue.sh --number $1 --color $2
   else
     echo "PhilipsHue.sh not available."
   fi
}

hue 4 red

printf "RUNNING GULP P\n\n"
gulp p
cd dist
rm -Rf ./archive
unzip -q archive.zip -d archive

hue 4 yellow

npm run test
if [ $? -eq 0 ]; then
    # green light if the command returned exit status 0
    hue 4 green
else
    # red light if the command returned 1 or sth else
    hue 4 red
fi

# Check for any GPL that might have infected my codebase
licensecheck | grep gpl
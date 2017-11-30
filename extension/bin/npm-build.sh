#!/bin/bash
philipsHue.sh --number 4 --color red

printf "RUNNING GULP P\n\n"
gulp p
cd dist
rm -Rf ./archive
unzip -q archive.zip -d archive
philipsHue.sh --number 4 --color yellow

npm run test
if [ $? -eq 0 ]; then
    # green light if the command returned exit status 0
    philipsHue.sh --color green --number 4
else
    # red light if the command returned 1 or sth else
    philipsHue.sh --color red --number 4
fi

# Check for any GPL that might have infected my codebase
licensecheck | grep gpl
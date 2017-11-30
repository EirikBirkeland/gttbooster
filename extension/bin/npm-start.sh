#! /bin/sh
#
# 1_normal.sh
# Copyright (C) 2017 eb <eb@cube>
#
# Distributed under terms of the MIT license.
#

philipsHue.sh --number 4 --color red
gulp zipAndManifestDEV
cd dist
rm -Rf ./archive
echo "Unzipping archive.zip to dist/archive"
unzip -q archive.zip -d archive
cowsay -f dragon-and-cow "All done. Cowabunga!" | lolcat --spread 0.4
philipsHue.sh --number 4 --color yellow

npm run test # or any other command
npm run lint
if [ $? -eq 0 ]; then
    # green light if the command returned exit status 0
    philipsHue.sh --color green --number 4
else
    # red light if the command returned 1 or sth else
    philipsHue.sh --color red --number 4
fi
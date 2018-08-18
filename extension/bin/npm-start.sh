#! /bin/bash
#
# 1_normal.sh
# Copyright (C) 2017 eb <eb@cube>
#
# Distributed under terms of the MIT license.
#

function hue {
   which philipsHue.sh && philipsHue.sh --number $1 --color $2 || echo "PhilipsHue.sh not available."
}

#hue 4 red

gulp zipAndManifestDEV
cd dist
rm -Rf ./archive
echo "Unzipping archive.zip to dist/archive"
unzip -q archive.zip -d archive
# cowsay -f dragon-and-cow "All done. Cowabunga!" | lolcat --spread 0.4

#hue 4 yellow

npm run test # or any other command
npm run lint
#if [ $? -eq 0 ]; then
    # green light if the command returned exit status 0
  #  hue 4 green
#else
    # red light if the command returned 1 or sth else
  #  hue 4 red
#fi

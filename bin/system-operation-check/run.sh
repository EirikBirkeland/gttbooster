#!/bin/bash

cd /home/eb/Share/00_obelisk/bin/system-operation-check

ava
if [ $? -ne 0 ]; then
   # Disabled mail because Philips Hue is just way better.
   # mail -s "Service down" eirikbirkeland@gmail.com,birketrans@gmail.com < ./mailContent.txt
   hue.sh --number 4 --color blue
else
   hue.sh --number 4 --getLights --filter color | grep "blue" && hue.sh --number 4 --color white
fi

# TODO: If lamp is black from before, but passes the check, it should revert to green/neutral light

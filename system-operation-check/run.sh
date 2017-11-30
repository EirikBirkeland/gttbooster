#!/bin/bash

npm run test
if [ $? -ne 0 ]; then
   # Disabled mail because Philips Hue is just way better.
   # mail -s "Service down" eirikbirkeland@gmail.com,birketrans@gmail.com < ./mailContent.txt
  hue.sh --number 4 --color black
fi
#! /bin/sh
#
# link_all.sh
# Copyright (C) 2017 eb <eb@cube>
#
# Distributed under terms of the MIT license.
#

cd cth-config
npm link
cd ..
cd cth-getDate
npm link
cd ..
cd cth-logger
npm link
cd ..
cd cth-prototype
npm link
cd ..


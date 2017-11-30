#! /bin/sh
#
# prepend_copyright.sh
# Copyright (C) 2016 eb <eb@cube>
#
# Distributed under terms of the MIT license.
#

for f in *.js; do
   echo "// Copyright © 2016 Eirik Birkeland. All rights reserved." > tmpfile
   cat "$f" >> tmpfile
   mv tmpfile "$f"
done

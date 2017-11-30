#! /bin/sh
#
# first_line_commment.sh
# Copyright (C) 2016 eb <eb@cube>
#
# Distributed under terms of the MIT license.
#

for f in *.js; do
   perl -pi -e 'print "//" if $. == 1' "$f"
done

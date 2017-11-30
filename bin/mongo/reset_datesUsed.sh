#! /bin/sh
#
# reset_datesUsed.sh
# Copyright (C) 2017 eb <eb@cube>
#
# Distributed under terms of the MIT license.
#

mongo gttbooster --eval 'db.users.update({}, {$set: {usage: {datesUsed: []}}}, {multi: true})'

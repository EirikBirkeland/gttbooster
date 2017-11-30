mongo gttbooster --eval 'db.users.update({}, {$set: {accessStatus: {trialStartDate: new Date()}}}, {multi: true})'

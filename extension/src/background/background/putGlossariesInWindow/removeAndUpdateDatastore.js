// Copyright © 2017 Eirik Birkeland. All rights reserved.
/**
 * Created by Eirik on 12.07.2017.
 */
import $ from 'jquery'
import localforage from 'localforage'

const storage = localforage.createInstance({"name": 'glossaries'})

export default function removeAndUpdateDatastore () {
   this.remove()
   //  Logger.log($(this).attr('data-database-name'))

   storage.getItem($(this).attr('data-database-name')).then((existingEntry) => {
      // Logger.log(existingEntry)

      existingEntry.lastUpdated = 691200000 // 8 days ago
      storage.setItem(existingEntry.keyName, existingEntry).then((res) => {
         //  Logger.log(res)
      })
   })
}

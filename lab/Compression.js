// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 02.09.2016.
 */
/*eslint-env browser, webextensions*/
'use strict'
import zlib from 'zlib'
import logger from 'cth-logger'

const Compression = (()=> {
    function zip(str, cb) {
        zlib.deflate(str, function (err, buffer) {
            if (err) logger.warn(err)
            const compressedStringBase64 = buffer.toString('base64')
            cb(compressedStringBase64)
        })
    }

    function unzip(str, cb) {
        const newBuffer = new Buffer(str, 'base64')
        zlib.unzip(newBuffer, (err, buffer)=> {
            if (err)logger.warn(err)
            const unzippedString = buffer.toString()
            cb(unzippedString)
        })
    }

    return {
        compress: zip,
        zip: zip,
        decompress: unzip,
        unzip: unzip
    }
})()

export {Compression}
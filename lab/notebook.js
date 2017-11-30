// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 2016/02/17.
 */
'use strict'

class Notebook {
    constructor(title) {
        this.title = title
    }

    init() {
        if (localStorage[cth.docInfo.dokNavn.innerHTML]) {
            this.content = JSON.parse(localStorage[cth.docInfo.dokNavn.innerHTML])
        } else {
            this.content = 'document notes (replace this string as you like; it will be saved between sessions)'
        }
    }

    getContent() {
        return this.content
    }
}

export default Notebook
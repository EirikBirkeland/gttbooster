// Copyright © 2016 Eirik Birkeland. All rights reserved.
// The main point is that handling should be handled here - modules should just be saying "save my stuff", "load my stuff", and this module/class should handle the implementation details. This way it would be extremely easy to switch between storage (localForage, localStorage etc.)

class Storage {
    constructor(method) {
        this.method = method
    }

    static save(key, value) {
        localStorage[key] = value
    }

    static load(key) {
        return localStorage[key]
    }
}
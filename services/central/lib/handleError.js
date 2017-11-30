module.exports = function handleError(err) {
    if (err.code && err.code === 11000) {
        console.warn('11000 error. You may have a race condition, causing an attempt to create two objects with the same _id at the same time.')
        console.warn(err)
    } else {
        console.warn(err)
    }
}
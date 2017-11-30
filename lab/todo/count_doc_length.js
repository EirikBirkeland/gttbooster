// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 2016/03/06.
 */

// TODO ideas:
// - Show character count completed and total character count
// - Display this info as hover information in GTT, when hovering existing segment-based count.
// - Fix the existing rounding error

// Count total length
_.reduce($(cth.dom.targetSegments).find('.goog-gtc-translatable'), function (acc, ele) {
    return acc + ele.innerHTML.length
}, 0)

// Count translated length
_.reduce($(cth.dom.targetSegments).find('.goog-gtc-from-human.goog-gtc-from-tm.goog-gtc-from-tm-ice-100'), function (acc, ele) {
    return acc + ele.innerHTML.length
}, 0)
// Copyright © 2016 Eirik Birkeland. All rights reserved.
(function(){ // old code - moved it to action.js
	// Package bookmarks.js
	"use strict"
	upon clicking an assigned button (with like a bookmark icon):
		for each targetSegment:
			match and store in buffer the tagged items, e.g. ¤word1¤ && their position in document (ID #).
		display a list of items, which are individually clickable, and take you to the bookmarked word. 
	});

- pass in the targetArray upon invocation (every function should be converted in this manner later, for loose coupling support). It allows for easier loose coupling, better unit testing and smaller functions with less repetition of code.
- however any custom versions of the array should be made on the spot. i.e. such as the "targetStripped" array.
function bookmarkFunc(targetSegments) {
	var outArr = [];
	for(var i=0;i<targetSegments.length;i++){
		var ID = targetSegments[i].id;
		var myMatch = '';
		if(myMatch = targetSegments[i].firstChild.innerHTML.match(/¤.+?¤/)) {
			outArr.push([ID, myMatch]);
		}
	}
	// display a list of items, which are individually clickable, and take you to the bookmarked word.
	$('#cth_btnid##')
}
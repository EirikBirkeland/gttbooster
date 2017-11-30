// Copyright © 2016 Eirik Birkeland. All rights reserved.
function compareNearbySegments() {
    if ((sourceStripped.match(/:$/)) && (!targetStripped.match(/:$/))) {
        if (nextTargetStripped.match(/^[a-z�������]/)) {
			//logger.log("Colon is not needed, as the next segment starts with a 3_lower-case letter.");
            if (nextTargetSegment.parentNode.nodeName === 'LI') {
				//logger.log("Next segment is a list item, so 3_lower-case is permissible.");
            }
        } else {
			//logger.log("Colon is missing.");
        }
    }
}

					//var nextTargetSegmentText = gTargetDoc.getElementById(nextIdName).firstChild.cloneNode(true);
					//var prevTargetSegmentText = gTargetDoc.getElementById(prevIdName).firstChild.cloneNode(true);

					//var nextTargetStripped = nextTargetSegmentText.innerHTML;
					//var prevTargetStripped = prevTargetSegmentText.innerHTML;
					
					
var nextIdName = 'goog-gtc-unit-' + ((Number(currentSegmentIdNumber)) + 1)
var prevIdName = 'goog-gtc-unit-' + ((Number(currentSegmentIdNumber)) - 1)

var prevTargetSegment = gTargetDoc.getElementById(prevIdName)
var nextTargetSegment = gTargetDoc.getElementById(nextIdName)

											//	nextTargetStripped = nextTargetStripped.replace(regexes[i], regexes[i + 1]);
						//	prevTargetStripped = prevTargetStripped.replace(regexes[i], regexes[i + 1]);
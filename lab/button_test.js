// Copyright © 2016 Eirik Birkeland. All rights reserved.
function doQATrados() {
    chrome.tabs.getSelected(null, function (theTab) {
		//logger.log("Tab URL: " + theTab.url);
        chrome.tabs.insertCSS(theTab.id, {
            file : 'css/custom.css'
        }, function () {
            chrome.tabs.executeScript(theTab.id, {
                file : 'action.js'
            })
        })
    })
}

// proof-of-concept - hooking up targetdoc button to function
/*
$(document).ready(function () {
	var hiddenInput = targetDoc.getElementsByClassName('gtc-img-popout gtc-img-top');
	$(hiddenInput).attr({
		'id' : 'myButton'
	});

	targetDoc.getElementById('myButton').addEventListener('click', function () {
		$("#wbheader").toggle(250);
		$("#gtc-gaiabar").toggle(250);
		$("#gtc-top-bar").toggle(250);
		$(".gtc-document-header").toggle(250);
	});
});
*/
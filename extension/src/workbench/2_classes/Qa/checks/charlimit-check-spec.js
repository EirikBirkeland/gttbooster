// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 22.07.2016.
 */
/* eslint-env node */


import runCharLimitCheck from './charlimit-check'
import path from 'path'
import $ from 'cheerio'
import fs from 'fs'
import test from 'ava'


const trickyMessage = "<span class=\"notranslate\" gtc:encodedoriginal=\"PHNwYW4gY2xhc3M9J25vdHJhbnNsYXRlJz4=\"><b>Description</b></span><br><span class=\"notranslate\" gtc-prop=\"linkify:true;\" gtc:encodedoriginal=\"PHNwYW4gY2xhc3M9J25vdHJhbnNsYXRlJyBndGMtcHJvcD0nbGlua2lmeTp0cnVlOyc-\">Detail text for wired OOBE error screen (200 characters) (WiredErrorDetail)</span><br><br><br><span class=\"notranslate feedback-note\" gtc:encodedoriginal=\"PHNwYW4gY2xhc3M9J25vdHJhbnNsYXRlIGZlZWRiYWNrLW5vdGUnPg==\"><i>Having difficulty translating? Please provide feedback. Click all that apply.</i></span><br><span class=\"goog-inline-block feedback-button jfk-button-standard\" gtc:encodedoriginal=\"PHNwYW4gY2xhc3M9J2dvb2ctaW5saW5lLWJsb2NrIGZlZWRiYWNrLWJ1dHRvbiBqZmstYnV0dG9uLXN0YW5kYXJkJz4=\"><span class=\"notranslate feedback-label\" onmousedown=\"parent._gaq.push(['_trackEvent', 'Cowbell', 'Feedback: Contextual screenshot needed', 'Jetstream_iOS+2651591641713365221']);this.parentNode.style.cursor='default';this.parentNode.style.opacity='0.4';this.parentNode.innerHTML=this.innerHTML;\" gtc:encodedoriginal=\"PHNwYW4gY2xhc3M9J25vdHJhbnNsYXRlIGZlZWRiYWNrLWxhYmVsJyBvbm1vdXNlZG93bj0ncGFyZW50Ll9nYXEucHVzaChbJmFwb3M7X3RyYWNrRXZlbnQmYXBvczssICZhcG9zO0Nvd2JlbGwmYXBvczssICZhcG9zO0ZlZWRiYWNrOiBDb250ZXh0dWFsIHNjcmVlbnNob3QgbmVlZGVkJmFwb3M7LCAmYXBvcztKZXRzdHJlYW1faU9TKzI2NTE1OTE2NDE3MTMzNjUyMjEmYXBvcztdKTt0aGlzLnBhcmVudE5vZGUuc3R5bGUuY3Vyc29yPSZhcG9zO2RlZmF1bHQmYXBvczs7dGhpcy5wYXJlbnROb2RlLnN0eWxlLm9wYWNpdHk9JmFwb3M7MC40JmFwb3M7O3RoaXMucGFyZW50Tm9kZS5pbm5lckhUTUw9dGhpcy5pbm5lckhUTUw7Jz4=\">Contextual screenshot needed</span></span><span class=\"goog-inline-block feedback-button jfk-button-standard\" gtc:encodedoriginal=\"PHNwYW4gY2xhc3M9J2dvb2ctaW5saW5lLWJsb2NrIGZlZWRiYWNrLWJ1dHRvbiBqZmstYnV0dG9uLXN0YW5kYXJkJz4=\"><span class=\"notranslate feedback-label\" onmousedown=\"parent._gaq.push(['_trackEvent', 'Cowbell', 'Feedback: Message description unclear', 'Jetstream_iOS+2651591641713365221']);this.parentNode.style.cursor='default';this.parentNode.style.opacity='0.4';this.parentNode.innerHTML=this.innerHTML;\" gtc:encodedoriginal=\"PHNwYW4gY2xhc3M9J25vdHJhbnNsYXRlIGZlZWRiYWNrLWxhYmVsJyBvbm1vdXNlZG93bj0ncGFyZW50Ll9nYXEucHVzaChbJmFwb3M7X3RyYWNrRXZlbnQmYXBvczssICZhcG9zO0Nvd2JlbGwmYXBvczssICZhcG9zO0ZlZWRiYWNrOiBNZXNzYWdlIGRlc2NyaXB0aW9uIHVuY2xlYXImYXBvczssICZhcG9zO0pldHN0cmVhbV9pT1MrMjY1MTU5MTY0MTcxMzM2NTIyMSZhcG9zO10pO3RoaXMucGFyZW50Tm9kZS5zdHlsZS5jdXJzb3I9JmFwb3M7ZGVmYXVsdCZhcG9zOzt0aGlzLnBhcmVudE5vZGUuc3R5bGUub3BhY2l0eT0mYXBvczswLjQmYXBvczs7dGhpcy5wYXJlbnROb2RlLmlubmVySFRNTD10aGlzLmlubmVySFRNTDsnPg==\">Message description unclear</span></span><span class=\"goog-inline-block feedback-button jfk-button-standard\" gtc:encodedoriginal=\"PHNwYW4gY2xhc3M9J2dvb2ctaW5saW5lLWJsb2NrIGZlZWRiYWNrLWJ1dHRvbiBqZmstYnV0dG9uLXN0YW5kYXJkJz4=\"><span class=\"notranslate feedback-label\" onmousedown=\"parent._gaq.push(['_trackEvent', 'Cowbell', 'Feedback: Other', 'Jetstream_iOS+2651591641713365221']);this.parentNode.style.cursor='default';this.parentNode.style.opacity='0.4';this.parentNode.innerHTML=this.innerHTML;\" gtc:encodedoriginal=\"PHNwYW4gY2xhc3M9J25vdHJhbnNsYXRlIGZlZWRiYWNrLWxhYmVsJyBvbm1vdXNlZG93bj0ncGFyZW50Ll9nYXEucHVzaChbJmFwb3M7X3RyYWNrRXZlbnQmYXBvczssICZhcG9zO0Nvd2JlbGwmYXBvczssICZhcG9zO0ZlZWRiYWNrOiBPdGhlciZhcG9zOywgJmFwb3M7SmV0c3RyZWFtX2lPUysyNjUxNTkxNjQxNzEzMzY1MjIxJmFwb3M7XSk7dGhpcy5wYXJlbnROb2RlLnN0eWxlLmN1cnNvcj0mYXBvcztkZWZhdWx0JmFwb3M7O3RoaXMucGFyZW50Tm9kZS5zdHlsZS5vcGFjaXR5PSZhcG9zOzAuNCZhcG9zOzt0aGlzLnBhcmVudE5vZGUuaW5uZXJIVE1MPXRoaXMuaW5uZXJIVE1MOyc-\">Other</span></span>"

const sourceDoc = fs.readFileSync(path.join(__dirname, '/421537/sourceDoc.html'), 'utf8')
const targetDoc = fs.readFileSync(path.join(__dirname, '/421537/targetDoc.html'), 'utf8')

const sourceSegment = $(sourceDoc).find('.goog-gtc-unit')
const targetSegment = $(targetDoc).find('.goog-gtc-unit')

// FIXME: The test input html might be broken ... replace it.
test('should match the RegEx - string too long', (t) => {

   t.regex(runCharLimitCheck($(sourceSegment.get(0)), $(targetSegment.get(0)), sourceDoc, $), /Character limit exceeded by/)

})
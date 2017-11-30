var scriptTypes = {
   German: "alphabetic",
   Japanese: "pictographic",
   Korean: "syllabic"
}

// The length check will then do something like this:

function getRatio(sourceLang, targetLang) {
   // First handle the general case
   if (scriptTypes[sourceLang] === scriptTypes[targetLang]) {
      return 160 // 160% tolerance is in my experience not a bad number - few false positives for Norwegian<>English, which are very similar languages.
   } else if (scriptTypes[sourceLang] === "alphabetic" && scriptTypes[targetLang] === "syllabic") {
      return 300 // Each Korean character represents a syllable. Each syllable is typically 2 chars.
   } else if (scriptTypes[sourceLang] === "alphabetic" && scriptTypes[targetLang] === "pictographic") {
      return 300 // E.g. English > Chinese
   }
}

I experienced this user complaint in the past, and I solved it by just making length-checking an option with a really high default of 400%:

![image](https://user-images.githubusercontent.com/12223584/33393987-3151cda0-d541-11e7-8a0a-9faf623d3485.png)

This is the 5 min "fix" I settled for. I never had anyone mention the test after that.

   We cannot expect every user to tweak the option manually, so 400% is probably a bit high for some languages.

   As a translator, I would prefer about 160-200% for English > Norwegian. False positives are distracting and a time sink, but we want to make sure that users do keep the option on. When we tell them effectively "You forgot to translate an entire sentence!", they will be very grateful.

   So, if we want to invest any effort in this, I suggest the following:

   First, we separate the world's languages into categories according to script type:
1. alphabetic
2. syllabic
3. pictographic

We create or find online a simple object looking something like this:

`var scriptTypes = {
   German: "alphabetic",
   Japanese: "pictographic", 
   Korean: "syllabic"
}`

This can be implemented in the existing QA check with an additional function:

// The length check will then do something like this:
function getRatio(sourceLang, targetLang) {
   // First handle the general case
   if (scriptTypes[sourceLang] === scriptTypes[targetLang]) {
      return 160 // 160% tolerance is in my experience not a bad number - few false positives for Norwegian<>English, which are very similar languages.
   } else if (scriptTypes[sourceLang] === "alphabetic" && scriptTypes[targetLang] === "syllabic") {
      return 300 // Each Korean character represents a syllable. Each syllable is typically 2 chars.
   } else if (scriptTypes[sourceLang] === "alphabetic" && scriptTypes[targetLang] === "pictographic") {
      return 300 // E.g. English > Chinese
   }
}
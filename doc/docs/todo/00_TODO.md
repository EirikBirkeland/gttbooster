TODO
----

Prior to launch:
- All options should have a description.

Needs thinking:
- Add more icons to glossary window
- Change the ÈULA?

Low prio:
- Add the glossary icon bar to bottom glossary view, maybe

- Improve feedback to user regarding spreadsheets
- Add unit test for checking that GTT's basic format has not changed, to ensure compatibility
- Add integration testing
- Add support for adding custom glossaries
- Move autocomplete window when typing

- Add detailed usage monitoring, registering each button click by user. Try Analytics first.

- Convert Mithril to React, eventually?

- LOW: Cache spreadsheet locally. Only update cached version when you click refresh.

PRIORITY
--------

* Add unit tests for all Google languages (it seems like just adding all would be useful)

QA - Improve highlighting
Keyword highlighting - Make small hashtag things with different colors
Keyword highlighting - Extend highlighting to multi-word highlighting
exclude internal tags otherwise (?)

----
I could make this into a standalone extension. Also highlight relevant target terms.
Also, on the fly changing of glossary: Custom built-in termcheck
Do keep the code and maintain and develop.
Show an accurate diff comparison in GTT between
-----
Permit period in target if "!" in source.

Term-check - change color of source highlight according to whether found in target.
-----
Parse glossary into JSON reliably
-----
1. user highlights "settings".
2. check gloss, in this case find "innstillinger".
3. highlight all root words and special highlighting for mismatching grammar.
-----
- modularity
- ability to toggle buttons/features on/off - toolbars should be customizable by detaching the icons. "EDit UI Mode".
- several default themes
-----
- How can I move the central thing programmatically?
Track changes within GTT
-----
QA system:

- list no# of issues
- ability to quickly jump to the errors in the document like Moravia's system

Autocomplete:
- Add icons: a chip for TM, a book for glossaries
- Add MT as well! (+ filter out garbage data in MT hit)
- Add option for setting # of chars before showing suggestions.
- Reduce default # of key presses to 1 before showing suggestions.
- Move autocomplete popup along when typing?
- Smaller popup menu
- Add LSC, so that previously segments are utilized

- Personal TM (kind of like MemoQ muse, or autocomplete, etc.)
* Allow user to allocate X gigabytes. Start removing oldest entries when space is running out.


<CTRL>:
    - Insert number entities
    - Insert placeholders

    - Auto-suggest translation when only one word differs?

    - AutoCorrect feature: E.g. youtube -> YouTube
    - AutoCorrect for "APple" -> "Apple"

    TODO:
    - Hardware detection:
    navigator.hardwareConcurrency

    Error reporting for spreadsheet should be added properly to GTT documents as well.

    Add permission manifest.json:
    "system.cpu" - this will let me access CPU model
    "system.system.memory" - this will let me access memory amount


    - Add ALL image elements to the KB (including glossary screen icons and similar)
    - Announce public betas on LinkedIn
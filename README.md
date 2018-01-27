### GTT Booster

GTT Booster is an Open Source Chrome Extension for Google Translator Toolkit. It was developed with space-based languages in mind, but you may have some luck using it for scriptio continua languages like Chinese or Hindi.

GTT Booster is freely available under the GPL 3.0 or later. You may [download and use the extension from the Chrome web store](https://chrome.google.com/webstore/detail/google-translator-toolkit/pjankaakojbendjaejlcnpgeldmfpjed) for any private or commercial purpose.

### Bug fixes and reports

Please file an issue on Github, or e-mail me at [gttbooster@gmail.com](gttbooster@gmail.com)

### Top features

#### Typing autocompletion :fast_forward:
leverages MT, TM and glossary matches
![](img/typing_autocompletion.gif)

### Merged view
[...]

### Customizable QA-checking, with all the standard checks built-in
[...]

### Configure everything!
![](img/options_screen.gif)

### State of the repository

The repository was closed source from its conception in 2014 until February 2018. The code is currently [on hold] being migrated to a cleaner version where principal UI elements have been wrapped in convenience classes that expose convenient public methods to simplify development.

For example, an old piece of code may look something like this:
```
if (segmentDomElement.className === 'someGtcClass') {
  // perform action
}
```

A newer piece of code however, has already abstracted away the DOM manipulations:
```
if (segment.isConfirmed) {
  // perform action
}
```

This reduces the necessity for dealing with the DOM directly, and speeds up development.

The present goal is to entirely localize DOM manipulations to one part of the code (`/src/1_domMappings`), akin to the Page Object Model.
These mappings are then consumed in `/src/2_classes`.
Lastly, the classes/objects are to be implemented in `/src/4_controller`, with the notable exception of `/src/workbench/2_classes/Toolbar`, which is currently a self-contained widget.

The controller sets up custom events and EventListeners. This pattern is favored because of its maintainability compared with previously tried approaches.

The development of this project has slowed down because of real-life, but I hope to maintain it for a long time to come to ensure people keep benefitting.

Eirik Birkeland

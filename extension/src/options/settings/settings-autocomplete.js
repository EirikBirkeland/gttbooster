export const autocompleteSettings = {
   "autocompleteIncludeTm": {
      "default": true,
      "description": 'Include suggestions from the TM'
   },
   "autocompleteIncludeMt": {
      "default": true,
      "description": 'Include suggestions from MT'
   },
   "autocompleteCleanUpMt": {
      "default": true,
      "description": 'Will strip away "tag soup" from MT source before giving suggestions.'
   },
   "autocompleteOnByDefault": {
      "default": true,
      "description": 'Enable typing autocompletion by default?',
      "tooltip": 'If activated, typing autocompletion will be activated just after you load a document'
   },
   "autocompleteTmThreshold": {
      "default": [
         true,
         '90'
      ],
      "description": 'Percentage threshold for including words from TM matches'
   },
   "autocompletePreserveCase": {
      "default": true,
      "description": 'Preserve the case of words when typing',
      "tooltip": 'Example: if you type "goog" and then use Autocompletion, the autocompleted word will be "google", even if the glossary entry written "Google".'
   },
   "autocompleteMinLength": {
      "default": [
         true,
         2
      ],
      "description": 'Number of letters typed before giving suggestions',
      "tooltip": ''
   }
}
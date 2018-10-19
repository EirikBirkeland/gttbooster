export const qaSettings = {
   "multipleSpaces": {
      "default": true,
      "description": 'Multiple spaces',
      "tooltip": 'If checked, multiple spaces will be flagged as an error'
   },
   "trailingSpace": {
      "default": true,
      "description": 'Trailing spaces',
      "tooltip": 'If checked, spaces that come at the very end of a segment will be flagged'
   },
   "leadingSpace": {
      "default": true,
      "description": 'Leading spaces',
      "tooltip": 'If checked, spaces that come at the very beginning of a segment will be flagged'
   },
   "emptySegment": {
      "default": true,
      "description": 'Segment is empty'
   },
   "capitalization": {
      "default": false,
      "description": 'Require same capitalization',
      "tooltip": 'If checked, errors in capitalization differences between source and target segments will be flagged'
   },
   "lengthValidation": {
      "default": [
         true,
         400
      ],
      "description": 'Compare lengths and warn',
      "suffix": '%',
      "tooltip": 'Determines the maximum length of the target segment relative to the source segment in percentage. Segments that exceed this restriction are flagged as errors.'
   },
   "sourceTargetIdentical": {
      "default": true,
      "description": 'Identical source and target',
      "tooltip": 'If flagged, translations that are identical to the original segment will be flagged.'
   },
   "repeatedWords": {
      "default": false,
      "description": 'Warn if words are repeated',
      "tooltip": 'If checked, you will get a warning if words are repeated. Relies on detecting white-space between two words.'
   },
   "validateNumbers": {
      "default": true,
      "description": 'Check for numbers',
      "tooltip": ''
   },
   // TODO: Check if this works
   "validatePlaceholders": {
      "default": true,
      "description": 'Check for missing placeholders and placeholder order',
      "tooltip": 'If checked, missing placeholders and incorrect placeholder order will be flagged'
   },
   "localizeUrls": {
      "default": true,
      "description": 'Check for unlocalized URL entities like hl=en and intl/en',
      "tooltip": ''
   }
};

export const languageSpecificQaSettings = {
   "endPunctuationRedundant": {
      "default": [
         true,
         '.,!:'
      ],
      "description": 'Check for redundant end-punctuation',
      "tooltip": 'If checked, any extra end-punctuation in the translation will be flagged'
   },
   "endPunctuationMissing": {
      "default": [
         true,
         '.,!:…'
      ],
      "description": 'Check for missing end-punctuation',
      "tooltip": 'If checked, any missing end-punctuation in the translation will be flagged'
   },
   "forbiddenCharacters": {
      "default": [
         true,
         ''
      ],
      "description": 'Warn if any of these characters are found in the translation'
   },
   "extraSpacesBefore": {
      "default": [
         true,
         ':!?;'
      ],
      "description": 'Warn if space in front of these characters'
   },
   "consecutivePunctuation": {
      "default": [
         true,
         ':!?;'
      ],
      "description": 'Consecutive punctuation'
   }
};
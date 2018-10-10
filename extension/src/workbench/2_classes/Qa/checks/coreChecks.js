/* eslint camelcase: [2, {properties: "never"}] */

const coreTests = [
   {
      "priority": 'high',
      "products": '',
      "source_pattern": '-"/\\s+$/"',
      "target_pattern": '/\\s+$/',
      "correction": 'Trailing space, not found in source',
      "toggle": 'on',
      "special": 'standard',
      "case_sensitive": 'no',
      "match_type": 'standard',
      "comment": '',
      "optionName": 'trailingSpace'
   },
   {
      "priority": 'high',
      "products": '',
      "source_pattern": '-"/^\\s+/"',
      "target_pattern": '/^\\s+/',
      "correction": 'Leading space not found in source',
      "toggle": 'on',
      "special": 'standard',
      "case_sensitive": 'no',
      "match_type": 'standard',
      "comment": '',
      "optionName": 'leadingSpace'
   },
   {
      "priority": 'high',
      "products": '',
      "source_pattern": '/(?!})\\p{p}$/',
      "target_pattern": '/[^\\p{p}]$/',
      "correction": 'End-punctuation missing',
      "toggle": 'on',
      "special": 'standard',
      "case_sensitive": 'no',
      "match_type": 'standard',
      "comment": '',
      "optionName": 'endPunctuationMissing'
   },
   {
      "priority": 'high',
      "products": '',
      "source_pattern": '/[^\\p{p}]$/',
      "target_pattern": '/\\p{p}$/',
      "correction": 'End-punctuation redundant',
      "toggle": 'on',
      "special": 'standard',
      "case_sensitive": 'no',
      "match_type": 'standard',
      "comment": '',
      "optionName": 'endPunctuationRedundant'
   },
   {
      "priority": 'low',
      "products": '',
      "source_pattern": '',
      "target_pattern": '/(?:^|\\s+)(\\p{Latin}+)\\s+\\1(?:$|\\s+)/',
      "correction": 'Repeated word: "@{t1}"',
      "toggle": 'on',
      "special": 'standard',
      "case_sensitive": 'no',
      "match_type": 'standard',
      "comment": '',
      "optionName": 'repeatedWords'
   },
   {
      "priority": 'high',
      "products": '',
      "source_pattern": '',
      "target_pattern": '/\\s,/',
      "correction": 'Space in front of comma',
      "toggle": 'on',
      "special": 'standard',
      "case_sensitive": 'no',
      "match_type": 'standard',
      "comment": '',
      "optionName": 'spaceBeforePunctuation'
   },
   {
      "priority": 'high',
      "products": '',
      "source_pattern": '',
      "target_pattern": '/(?:[^.,]|^)[.,]{2}(?:[^.,]|$)/',
      "correction": 'Two consecutive commas or periods',
      "toggle": 'on',
      "special": 'standard',
      "case_sensitive": 'no',
      "match_type": 'standard',
      "comment": '',
      "optionName": 'consecutivePunctuation'
   },
   {
      "priority": 'high',
      "products": '',
      "source_pattern": '/^\\p{Lu}/',
      "target_pattern": '/^\\p{Ll}/',
      "correction": 'Different capitalization',
      "toggle": 'on',
      "special": 'standard',
      "case_sensitive": 'no',
      "match_type": 'standard',
      "comment": '',
      "optionName": 'wrongCapitalization'
   },
   {
      "priority": 'high',
      "products": '',
      "source_pattern": '',
      "target_pattern": '/[ ]{2,}/',
      "correction": 'Multiple spaces',
      "toggle": 'on',
      "special": 'standard',
      "case_sensitive": 'no',
      "match_type": 'standard',
      "comment": '',
      "optionName": 'multipleSpaces'
   },
   {
      "priority": 'high',
      "products": '',
      "source_pattern": '-"/^\\s*$/"',
      "target_pattern": '/^\\s*$/',
      "correction": 'Empty segment!',
      "toggle": 'on',
      "special": 'standard',
      "case_sensitive": 'no',
      "match_type": 'standard',
      "comment": '',
      "optionName": 'emptySegment'
   },
   {
      "priority": 'high',
      "products": '',
      "source_pattern": '',
      "target_pattern": '/hl=en|intl\\/en/',
      "correction": 'Unlocalized URL',
      "toggle": 'on',
      "special": 'standard',
      "case_sensitive": 'no',
      "match_type": 'standard',
      "comment": '',
      "optionName": 'localizeUrls'
   }
]

export default coreTests

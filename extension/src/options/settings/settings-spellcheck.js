export const spellcheckSettings = {
   "spellcheckEnabled": {
      "default": false,
      "description": 'Enable/disable spellchecking'
   },

   "spellcheckOverride": {
      "default": [false, ''],
      "description": 'Always run spellcheck using this language:',
      "tooltip": 'This option will override auto-detection attempts. We recommend using this option if you work with a single target language. This will ensure that the same spellchecking database is always used. The individual codes listed correspond to particular pre-existing spellchecking databases.',
      "override": 'select',
      "values": []
   },

   "spellcheckStoreSelector": {
      "default": [
         true,
         ''
      ],
      "description": 'Show exceptions added for this database:',
      "override": 'select',
      "values": []
   }
};
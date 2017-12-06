module.exports = {
   "env": {
      "browser": true,
      "node": true,
      "webextensions": true,
      "commonjs": true,
      "es6": true
   },
   // Start with "recommended" and then disable/enable rules below.
   "extends": "eslint:recommended",
   "parser": "babel-eslint",
   "parserOptions": {
      "ecmaFeatures": {
         "experimentalObjectRestSpread": true,
         "jsx": true,
         "impliedStrict": true
      },
      "sourceType": "module"
   },
   "plugins": [
      "react"
   ],
   "rules": {
      "react/jsx-uses-vars": 1,
      "react/forbid-component-props": [1, {"forbid": [""]}],
      "react/jsx-indent-props": [0, 2],
      "react/jsx-indent": [0, 2],
      "react/jsx-handler-names": [0, {
         "eventHandlerPrefix": "handle",
         "eventHandlerPropPrefix": "abc"
      }],
      "no-unused-vars": 0,
      "indent": [0, 3, {SwitchCase: 1}],
      "semi-style": ["error", "first"],
      "func-names": [0, "always"],
      "comma-dangle": [0, "never"],
      "space-before-function-paren": [0],
      "eol-last": [0],
      "no-warning-comments": [0, {"terms": ["todo", "fixme", "xxx"], "location": "start"}],
      "no-console": 1,
      "quotes": 0,
      "no-useless-escape": 0,
      "strict": 1,
   },
   "overrides": [
      {
         "files": [ "src/*.js" ],
         "excludedFiles": "src/new/**"
      }
   ],
   "root": true,
   "globals": {
      "cth": true
   }
}
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
      "react/jsx-uses-vars": "warn",
      "react/forbid-component-props": ["warn", {"forbid": [""]}],
      "react/jsx-indent-props": ["off", 2],
      "react/jsx-indent": ["off", 2],
      "react/jsx-handler-names": ["off", {
         "eventHandlerPrefix": "handle",
         "eventHandlerPropPrefix": "abc"
      }],
      "no-debugger": "warn",
      "no-unused-vars": "off",
      "indent": ["off", 3, {SwitchCase: 1}],
      "object-curly-spacing": ["warn", "never"],
      "semi": ["warn", "never"],
      "semi-style": ["warn", "last"],
      "no-extra-semi": ["off"],
      "func-names": ["off", "always"],
      "comma-dangle": ["off", "never"],
      "padded-blocks": ["warn", "never"],
      "space-before-function-paren": [1],
      "eol-last": ["off"],
      "no-warning-comments": ["off", {"terms": ["todo", "fixme", "xxx"], "location": "start"}],
      "no-console": "warn",
      "no-multiple-empty-lines": "warn",
      "quotes": "off",
      "no-useless-escape": "off",
      "strict": "warn",
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

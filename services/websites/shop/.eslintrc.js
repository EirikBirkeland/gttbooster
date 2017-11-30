module.exports = {
    "env": {
        "browser": true,
        "webextensions": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "semi": [
            "error",
            "never"
        ],
        "react/jsx-uses-vars": 1,
        "no-unused-vars": 0,
        //"valid-jsdoc": 1
    },
    "root": true,
    "globals": {
    }
}
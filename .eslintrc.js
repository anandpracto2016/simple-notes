module.exports = {
  "plugins": [
    "react"
  ],
  "extends": ["plugin:react/recommended"],
  "parserOptions": {
    "sourceType": "module",
    "ecmaFeatures": {
      "modules": true,
      "jsx": true,
      "experimentalObjectRestSpread": true
    }
  },
  "env": {
    "amd": true,
    "browser": true,
    "es6": true,
    "jquery": true,
    "node": true
  },
  "rules": {
    "react/jsx-uses-vars": 2,
    "react/jsx-uses-react": 2,
    "react/no-find-dom-node": 2,
    "react/no-did-mount-set-state": 2,
    "react/no-did-update-set-state": 2,
    "react/no-direct-mutation-state": 2,
    "react/no-find-dom-node": 2,
    "react/no-unknown-property": 2,
    "react/no-is-mounted": 2,

    // Commenting this because there are parent props with are passed directly to child
    // hence they are not really used in that component, and this rule fails
    "react/no-unused-prop-types": 1,

    "react/prefer-es6-class": 2,
    "react/require-optimization": 2,
    "react/prefer-stateless-function": 2,
    "react/jsx-equals-spacing": 1,
    "react/jsx-handler-names": 1,
    "react/jsx-key": 2,
    "react/jsx-no-duplicate-props": 2,
    "react/jsx-pascal-case": 2,
    "react/jsx-no-undef": 2,
    "react/prop-types": 2,
    "react/no-children-prop": 1,
    "react/no-will-update-set-state": 2,

    "comma-dangle": [
      2,
      "never"
    ],
    "no-octal": 1,
    "no-cond-assign": 2,
    "no-debugger": 2,
    "no-dupe-args": 2,
    "no-dupe-keys": 2,
    "no-duplicate-case": 2,
    "no-empty": 2,
    "no-empty-function": 2,
    "no-func-assign": 2,
    "no-sparse-arrays": 2,
    "eqeqeq": 2,
    "no-eval": 2,
    "no-magic-numbers": [2, {
      "ignoreArrayIndexes": true,
      "ignore": [-1, 0, 1]
    }],
    "no-lone-blocks": 2,
    "no-redeclare": 2,
    "no-unused-expressions": 1,
    "no-useless-concat": 2,
    "no-unused-vars": [1, { "vars": "all", "args": "none" }],
    "no-use-before-define": 1,
    "no-lonely-if": 2,
    "no-mixed-spaces-and-tabs": 2,
    "new-cap": 1,
    "indent": [
      2,
      2,
      {
        "VariableDeclarator": {
          "var": 2,
          "let": 2,
          "const": 3
        },
        "SwitchCase": 1
      }
    ],
    "vars-on-top": 1
  }
}

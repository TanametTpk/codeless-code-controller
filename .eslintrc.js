module.exports = {
    // Standard JavaScript Style Guide
    extends: ["standard", "plugin:prettier/recommended"],
    // Airbnb JavaScript Style Guide
    // extends: ["airbnb-base", "plugin:prettier/recommended"],
    // Google JavaScript Style Guide
    // extends: ["google", "plugin:prettier/recommended"],
    rules: {
       "prettier/prettier": ["error", { "singleQuote": true }]
    }
 };
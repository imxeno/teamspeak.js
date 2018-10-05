module.exports = {
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 8
  },
  env: {
    es6: true,
    node: true
  },
  rules: {
    "require-jsdoc": [
      "error",
      {
        require: {
          FunctionDeclaration: true,
          MethodDefinition: true,
          ClassDeclaration: false,
          ArrowFunctionExpression: false,
          FunctionExpression: false
        }
      }
    ],
    "valid-jsdoc": "error"
  }
};

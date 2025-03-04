module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  extends: ["eslint:recommended"],
  rules: {
    // Add any specific rules here
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
      },
      extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    },
  ],
  ignorePatterns: [".eslintrc.js"],
};

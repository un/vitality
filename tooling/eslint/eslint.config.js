/**
 * @fileoverview ESLint configuration for the tooling/eslint directory
 */

export default [
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: {
        // Common Node.js globals
        require: "readonly",
        module: "writable",
        process: "readonly",
        console: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
      },
    },
    files: ["**/*.js"],
    rules: {
      // Basic rules
      "no-unused-vars": "warn",
      "no-undef": "error",
    },
  },
  {
    ignores: ["node_modules/**", "eslint.config.js"],
  },
];

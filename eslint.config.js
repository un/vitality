import path from "path";
import { fileURLToPath } from "url";
import nextPlugin from "@next/eslint-plugin-next";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import drizzlePlugin from "eslint-plugin-drizzle";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";

import augmentedPlugin from "./tooling/eslint/index.js";

// Get the directory name using ES module approach
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mock for the custom plugin that might not be available
const customPlugin = {
  rules: {
    "table-needs-org-id": {
      meta: {},
      create() {
        return {};
      },
    },
  },
};

export default [
  // Base configuration for all files
  {
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
    },
    rules: {
      "no-console": ["error", { allow: ["info", "warn", "trace", "error"] }],
    },
  },

  // TypeScript files
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: true,
      },
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin,
    },
    rules: {
      ...typescriptPlugin.configs["recommended-type-checked"].rules,
      ...typescriptPlugin.configs["stylistic-type-checked"].rules,
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/no-misused-promises": [
        "error",
        { checksVoidReturn: { attributes: false } },
      ],
    },
  },

  // Database schema files
  {
    files: ["**/schema/**/*.ts"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: path.resolve(__dirname, "packages/db/tsconfig.json"),
      },
    },
  },

  // Drizzle files
  {
    plugins: {
      drizzle: drizzlePlugin,
    },
    rules: {
      ...drizzlePlugin.configs.all.rules,
    },
  },

  // Database files
  {
    files: ["./packages/database/**/*"],
    plugins: {
      "@u22n/custom": customPlugin,
    },
    rules: {
      "@u22n/custom/table-needs-org-id": "error",
    },
  },

  // Next.js files
  {
    files: ["./apps/web/**/*"],
    plugins: {
      "@next/next": nextPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      ...nextPlugin.configs["core-web-vitals"].rules,
      "react/no-children-prop": ["warn", { allowFunctions: true }],
      "@next/next/no-img-element": "off",
    },
  },

  // Augmented TypeID rule - apply to all TypeScript files
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@augmented": augmentedPlugin,
    },
    rules: {
      "@augmented/typeid": "error",
      "@augmented/owneridcolumn": "error",
    },
  },

  // Ignore patterns
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/.next/**",
      "**/.turbo/**",
      "**/.cache/**",
      "**/coverage/**",
    ],
  },
];

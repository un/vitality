import baseConfig from "@augmented/eslint-config/base";
import reactConfig from "@augmented/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".expo/**", "expo-plugins/**", "babel.config.js"],
  },
  ...baseConfig,
  ...reactConfig,
];

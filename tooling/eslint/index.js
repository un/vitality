/**
 * @fileoverview ESLint plugin for Augmented
 */

import ownerIdColumnRule from "./owneridcolumn.js";
import typeidRule from "./typeid.js";

export default {
  rules: {
    typeid: typeidRule,
    owneridcolumn: ownerIdColumnRule,
  },
  configs: {
    recommended: {
      plugins: ["@augmented"],
      rules: {
        "@augmented/typeid": "error",
        "@augmented/owneridcolumn": "error",
      },
    },
  },
};

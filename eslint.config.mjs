import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["src-ts/**/*.ts"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2022
      }
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/no-explicit-any": "error",

      "no-var": "error",
      "prefer-const": "error",
      "no-console": "warn",
      "eqeqeq": "error"
    }
  },
  {
    files: ["src-ts/**/*.test.ts", "src-ts/**/*.spec.ts"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
        ...globals.es2022
      }
    },
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
      "no-console": "off"
    }
  },
  {
    ignores: [
      "node_modules/",
      "dist/",
      "build/",
      "coverage/",
      "src/**/*.js"
    ]
  }
];
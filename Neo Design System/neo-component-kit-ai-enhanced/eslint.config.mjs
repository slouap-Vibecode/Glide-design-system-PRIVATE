// @ts-check

import pluginVue from "eslint-plugin-vue";
import { defineConfigWithVueTs, vueTsConfigs } from "@vue/eslint-config-typescript";
import { standardTypeChecked } from "@vue/eslint-config-standard-with-typescript";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import globals from "globals";

export default defineConfigWithVueTs(
  {
    ignores: ["**/build/**", "**/dist/**", "**/*.js", "documentation/", "test-application/", "types/"],
  },
  pluginVue.configs["flat/essential"],
  vueTsConfigs.strictTypeChecked,
  vueTsConfigs.stylisticTypeChecked,
  standardTypeChecked,
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "commonjs",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    files: ["**/*.{vue,js,jsx,cjs,mjs,ts,tsx,cts,mts}"],
    rules: {
      "no-console": "warn",
      "no-debugger": "warn",
      "no-void": ["error", { allowAsStatement: true }],
      "no-irregular-whitespace": "error",
      "@typescript-eslint/no-explicit-any": "error",
      complexity: ["error", 15],
      "max-lines-per-function": ["error", { max: 45, skipBlankLines: true, skipComments: true }],
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", caughtErrors: "none" }],
      "@typescript-eslint/member-ordering": [
        "error",
        {
          default: [
            // Index signature
            "signature",

            // it will be props
            "public-decorated-field",
            "protected-decorated-field",
            "private-decorated-field",

            // Fields
            "public-static-field",
            "public-instance-field",
            "public-abstract-field",
            "protected-static-field",
            "protected-instance-field",
            "protected-abstract-field",
            "private-static-field",
            "private-instance-field",

            // Constructors
            "public-constructor",
            "protected-constructor",
            "private-constructor",

            // public methods should be first as they are exposed
            "public-static-method",
            "public-decorated-method",
            "public-instance-method",
            "public-abstract-method",

            // Getters and setters (computed properties)
            ["public-static-get", "public-static-set"],
            ["public-decorated-get", "public-decorated-set"],
            ["public-instance-get", "public-instance-set"],
            ["public-abstract-get", "public-abstract-set"],
            ["public-get", "public-set"],

            ["protected-static-get", "protected-static-set"],
            ["protected-decorated-get", "protected-decorated-set"],
            ["protected-instance-get", "protected-instance-set"],
            ["protected-abstract-get", "protected-abstract-set"],
            ["protected-get", "protected-set"],

            ["private-static-get", "private-static-set"],
            ["private-decorated-get", "private-decorated-set"],
            ["private-instance-get", "private-instance-set"],
            ["private-get", "private-set"],

            ["static-get", "static-set"],
            ["instance-get", "instance-set"],
            ["abstract-get", "abstract-set"],
            ["decorated-get", "decorated-set"],
            ["get", "set"],

            // Methods
            "protected-static-method",
            "protected-decorated-method",
            "protected-instance-method",
            "protected-abstract-method",

            "private-static-method",
            "private-decorated-method",
            "private-instance-method",
          ],
        },
      ],

      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/strict-boolean-expressions": "off",
      "@typescript-eslint/restrict-template-expressions": "off", // should be considered for enabling
      "@typescript-eslint/no-extraneous-class": "off",
      "@typescript-eslint/prefer-function-type": "off",
      "@typescript-eslint/no-duplicate-type-constituents": "off",
      "@typescript-eslint/no-redundant-type-constituents": "off",
      "@typescript-eslint/no-unsafe-enum-comparison": "off",
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/no-unnecessary-condition": "off",
      "@typescript-eslint/no-confusing-void-expression": "off",
      "@typescript-eslint/no-unnecessary-type-arguments": "off",
      "@typescript-eslint/unified-signatures": "off",
      "@typescript-eslint/no-deprecated": "off",
      "@typescript-eslint/no-empty-function": ["error", { allow: ["arrowFunctions"] }],

      // force camel case in vue templates
      "vue/attribute-hyphenation": ["error", "never"],
    },
  },
  eslintConfigPrettier,
);

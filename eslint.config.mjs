import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["node_modules/**", "cypress/results/**", "cypress/evidence/**"],
  },
  {
    ...js.configs.recommended,
    files: ["**/*.mjs"],
  },
  {
    files: ["**/*.ts"],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    rules: {
      "@typescript-eslint/consistent-type-imports": "error",
      "no-console": "error",
      "no-restricted-syntax": [
        "error",
        {
          selector:
            "CallExpression[callee.object.name=/^(it|describe|context)$/][callee.property.name=/^(only|skip)$/]",
          message: "Keep all assessment tests active.",
        },
      ],
    },
  },
);

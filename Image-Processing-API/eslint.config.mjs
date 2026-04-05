import globals from "globals";
import parser from "@typescript-eslint/parser";
import eslintPlugin from "@typescript-eslint/eslint-plugin";
import prettierPlugin from "eslint-plugin-prettier";

export default [
    {
        files: ["src/**/*.ts", "tests/**/*.ts"],
        languageOptions: {
            parser: parser,
            parserOptions: {
                project: "./tsconfig.json",
                sourceType: "module",
            },
            globals: {
                ...globals.node,
                ...globals.es2021,
            },
        },
        plugins: {
            "@typescript-eslint": eslintPlugin,
            prettier: prettierPlugin,
        },
        rules: {
            ...eslintPlugin.configs.recommended.rules,
            "prettier/prettier": "error",
        },
    },
];

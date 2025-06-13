module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
    browser: true,
  },
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
  rules: {
    // クォーテーションはdoubleに統一
    quotes: ["error", "double"],

    // 基本的なルール
    "prefer-const": "error",
    "no-var": "error",
    "no-console": "warn",
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
  },
  ignorePatterns: ["node_modules/", "playwright-report/", "test-results/", "*.config.ts"],
};

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts', 'tailwind.config.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: { project: ["./tsconfig.json"] },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}

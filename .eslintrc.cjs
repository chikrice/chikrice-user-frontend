module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'perfectionist'],
  rules: {
    'react-refresh/only-export-components': 'off',
    'react/display-name': 'off',
    'perfectionist/sort-imports': [
      'error',
      {
        type: 'line-length',
        order: 'asc',
        newlinesBetween: 1,
        internalPattern: ['^src/.+', '^/src/.+', '^@/.+', '^~/.+'],
        groups: [
          'type-import',
          ['value-builtin', 'value-external'],
          'type-internal',
          'value-internal',
          ['type-parent', 'type-sibling', 'type-index'],
          ['value-parent', 'value-sibling', 'value-index'],
          'ts-equals-import',
          'unknown',
        ],
      },
    ],
  },
};

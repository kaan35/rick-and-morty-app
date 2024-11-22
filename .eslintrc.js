// https://docs.expo.dev/guides/using-eslint/

module.exports = {
  extends: ['expo', 'eslint:recommended', 'plugin:prettier/recommended'],
  ignorePatterns: ['/dist/*'],
  root: true,
  rules: {
    'arrow-body-style': 'warn',
    'no-unsafe-optional-chaining': 'warn',
    'react-hooks/exhaustive-deps': 'off',
    'react/no-unstable-nested-components': 'off',
    'require-await': 'warn',
    'sort-keys': 'warn',
    'sort-vars': 'warn',
  },
};

module.exports = {
  root: true,
  parserOptions: {
    parser: [
      '@typescript-eslint/parser',
      'babel-eslint',
    ],
    sourceType: "module",
    ecmaVersion: 2016,
  },
  env: {
    browser: true,
    jest: true,
    es6: true
  },
  extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'standard',
      'prettier'
  ],
  // required to lint *.vue files
  plugins: ['@typescript-eslint', 'vue'],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    '@typescript-eslint/explicit-function-return-type' : 'off',
    '@typescript-eslint/no-explicit-any': 'off'
  }
}

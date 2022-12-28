module.exports = {
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  globals: {
    LOGGER: true,
    HOST_URL: true,
    SMS_VALIDATION: false,
    REDUX_DEVTOOLS: false,
  },
  extends: ['airbnb'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', 'import', 'jsx-a11y'],
  overrides: [
    {
      files: ['**/*.spec.js', '**/*.spec.jsx', 'setupTests.js'],
      env: {
        jest: true,
      },
    },
    {
      files: [
        'setupTests.js',
        'webpack.common.js',
        'webpack.dev.js',
        'webpack.stage.js',
        'webpack.prod.js',
        'src/server/*'
      ],
      rules: {
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      },
    },
    {
      files: ['src/**/*Slice.js'],
      // rules: { 'no-param-reassign': ['error', { props: false }] },
      rules: { 'no-param-reassign': 0 },
    },
  ],
  rules: {
    semi: ['error', 'never', { beforeStatementContinuationChars: 'always' }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/react-in-jsx-scope': 0,

    // bug with prop-types
    // https://github.com/yannickcr/eslint-plugin-react/issues/2804
    'react/prop-types': 0,
    'jsx-a11y/label-has-associated-control': [2, { controlComponents: ['Field'] }],
    'object-curly-newline': ['error', { consistent: true, minProperties: 7 }],
    camelcase: 1,
  },
}

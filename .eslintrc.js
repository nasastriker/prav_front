module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  'extends': [
    'plugin:vue/essential',
 //   'eslint:recommended'
  ],
  rules: {
    'vue/multi-word-component-names': 0,
    'vue/no-unused-components': 0,
    'vue/return-in-computed-property': 0,
    'vue/require-prop-type-constructor': 0,
    'vue/require-v-for-key': 0,
    'vue/valid-v-on': 0,
    'vue/valid-v-bind-sync': 0,
    'vue/valid-v-for': 0,
    'vue/no-unused-vars': 0,
    'vue/no-parsing-error': 0,
    'vue/no-side-effects-in-computed-properties': 0,
    'vue/no-use-v-if-with-v-for': 0,
    'vue/no-mutating-props': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

   },
  parserOptions: {
//    parser: 'babel-eslint',
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
    sourceType: 'module'
  }
}

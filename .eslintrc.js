module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: ["plugin:vue/essential", "@vue/standard"],

  parserOptions: {
    parser: "@babel/eslint-parser",
  },

  rules: {
    "no-console": "off",
    "semi": "off",
    'vue/multi-word-component-names': "off", 
    'vue/no-mutating-props': "off"
  },

  extends: ["plugin:vue/essential"],
};

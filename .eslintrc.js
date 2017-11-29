module.exports = {
  extends: 'airbnb-base',
  env: {
    browser: true,
    jest: true,
  },

  rules: {
    semi: [2, 'never'],
    'no-multiple-empty-lines': [2, { max: 3 }],
    'no-multi-spaces': 0,
  },
}

const base = require('eslint-config-react-app');

const customRules = {
    'react/no-unused-prop-types': 2,
    'no-unused-vars': [
        'error',
        { vars: 'all', args: 'after-used', ignoreRestSiblings: false },
    ],
    'no-dupe-keys': 2,
    semi: ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'object-curly-spacing': ['error', 'always'],
    'arrow-parens': ['error', 'always'],
};

const mergedRules = Object.assign({}, base.rules, customRules);

module.exports = Object.assign({}, base, {
    rules: mergedRules,
});

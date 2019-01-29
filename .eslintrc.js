module.exports = {
    env: {
        browser: true,
        commonjs: true,
        node: true,
        jest: true
    },
    extends: ['eslint:recommended', 'plugin:vue/recommended'],
    rules: {
        'vue/html-indent': ['warn', 4],
        'vue/no-unused-vars': 'warn',
        'vue/no-v-html': 'off',
        'no-tabs': 'warn',
        indent: ['warn', 4],
        'no-regex-spaces': 'warn',
        'block-spacing': ['warn', 'always'],
        quotes: ['warn', 'backtick'],
        'comma-spacing': ['warn', { before: true, after: true }],
        'brace-style': ['warn', '1tbs', { allowSingleLine: true }],
        'keyword-spacing': ['warn', { before: true, after: true }],
        'no-trailing-spaces': ['warn'],
        'object-curly-spacing': ['warn', 'always'],
        'array-bracket-spacing': [
            'warn',
            'always',
            { arraysInArrays: true, objectsInArrays: true, singleValue: true }
        ],
        'computed-property-spacing': ['warn', 'always'],
        'func-call-spacing': ['warn', 'never'],
        'space-in-parens': ['warn', 'always'],
        eqeqeq: ['warn', 'always'],
        'space-infix-ops': ['warn', { int32Hint: false }],
        'space-unary-ops': ['warn', { words: true, nonwords: false }],
        'semi-spacing': ['warn', { before: true, after: false }],
        semi: ['warn', 'never', { beforeStatementContinuationChars: 'any' }]
    }
};

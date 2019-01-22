module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:vue/recommended',
    ],
    rules: {
        "indent": ["warn", 4],
        "vue/html-indent": ["warn", 4],
        "vue/no-unused-vars": 'warn',
        "vue/no-v-html": 0 ,
    },
    env: {
        "browser": true,
        "commonjs": true,
    }
}


module.exports = {
    extends: [
        // add more generic rulesets here, such as:
        // 'eslint:recommended',
        'plugin:vue/recommended'
    ],
    rules: {
        "indent": [ "warn" , 4 ] ,
        "vue/html-indent": [ "warn" , 4 ] ,
        // 'vue/no-unused-vars': 'warn' ,
    }
}
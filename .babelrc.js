module.exports = {
    presets: ['@babel/env'], // "@babel/preset-env"
    plugins: [
        // 可以简写掉plugin
        // 比如等同于 @babel/plugin-transform-vue-jsx
        // 'babel-plugin-transform-vue-jsx',
        [
            '@babel/transform-runtime',
            {
                regenerator: true
            }
        ],
        'babel-plugin-transform-object-rest-spread',
        '@babel/syntax-dynamic-import'
    ]
};

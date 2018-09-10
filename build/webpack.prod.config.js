/**
 * 生产环境：组件库打包-压缩
 */

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');

module.exports = merge(webpackBaseConfig, {
    devtool: 'source-map',
    mode: 'production',
    // 入口
    entry: {
        // 入口只包括组件.vue代码，不包括样式，样式单独打包
        main: './src/index.js'
    },
    // 输出
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: 'nopvue.min.js',
        library: 'nopvue',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    // 必须加上externals（产出文件不打包vue）和library，libraryTarget（打包产出模式）。
    externals: {
        vue: {
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue'
        }
    },
    optimization: {
        // mode:production下将默认压缩，这个配置项将会覆盖默认压缩策略
        minimizer: [
            // 配置UglifyJsPlugin压缩js文件
            new UglifyJsPlugin({
                parallel: true,
                sourceMap: true
            })
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        })
    ]
});

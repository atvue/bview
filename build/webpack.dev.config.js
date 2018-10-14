/**
 * 本地开发：demo预览
 */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');

module.exports = merge(webpackBaseConfig, {
    devtool: 'eval-source-map',
    mode: 'development',
    // 入口
    entry: {
        main: './demo/main',
        // doc: './doc/index',
        vendors: ['vue', 'vue-router']
    },
    // 输出
    output: {
        path: path.join(__dirname, '../dev/dist'),
        publicPath: '',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    resolve: {
        alias: {
            nopvue: '../src/index',
            vue: 'vue/dist/vue.esm.js'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            filename: path.join(__dirname, '../dev/dist/index.html'),
            template: path.join(__dirname, '../demo/index.html')
        }),
        new HtmlWebpackPlugin({
            inject: true,
            filename: path.join(__dirname, '../dev/dist/doc.html'),
            template: path.join(__dirname, '../demo/index.html')
        })
    ]
});

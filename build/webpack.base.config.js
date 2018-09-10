/**
 * 通用webpack配置
 */

const path = require('path');
const webpack = require('webpack');
const pkg = require('../package.json');
const postcssConfig = require('./postcssConfig');
// @UPDATED vue-loader更新至v15+版本后的 BREAKING CHANGE
// 需要引入插件 注意require括号内写法
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const isProd = process.env.NODE_ENV;

module.exports = {
    // 加载器
    module: {
        rules: [
            // .vue文件
            // @TODO iview中向vue-loader传入了postLoader参数，了解一下什么用
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            // .js文件
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: { sourceMap: true },
                exclude: /node_modules/
            },
            // style: less
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: Object.assign({}, postcssConfig, {
                            sourceMap: true
                        })
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            // style : scss
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            options: Object.assign({}, postcssConfig, {
                                sourceMap: true
                            })
                        }
                    },
                    {
                        loader: 'scss-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            // style: css
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            options: Object.assign({}, postcssConfig, {
                                sourceMap: true
                            })
                        }
                    }
                ]
            },
            // 静态html模板
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            // 图片&字体资源
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10240
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            vue: 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, '../src')
        }
    },
    plugins: [new VueLoaderPlugin()]
};

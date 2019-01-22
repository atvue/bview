/**
 * 展示站点构建配置构建配置：
 * 打包压缩 混淆
 * css文件独立抽取 压缩
 * 文件名加上内容md5
 */
const mode = 'production';

const chalk = require('chalk');
const path = require('path');
const webpack = require('webpack');
const { src, site } = require('./project-path');

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const {
        getNamePrefix,
        rlaLessFile,
        lessPrefixKey
    } = require('./getLessVariables'),
    namePrefixer = getNamePrefix();
if (namePrefixer === '') {
    let msg = chalk`{yellow ${'wraning'}}: {green ${rlaLessFile}}，不存在名为：{red ${lessPrefixKey}}的变量`;
    console.log(msg);
}

// css压缩
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// js压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// html
const HtmlWebpackPlugin = require('html-webpack-plugin');

const cssFilename = 'css/[name].[contenthash:8].css';

const webpackConfig = {
    entry: {
        index: './site/index.js'
    },
    output: {
        path: path.resolve(__dirname, '../sitedist'),
        publicPath: '/',
        filename: 'js/[name].[chunkhash:8].js?',
        chunkFilename: 'js/chunks/[name].[chunkhash:8].js'
    },
    mode,
    module: {
        rules: [
            // .vue文件
            // @TODO iview中向vue-loader传入了postLoader参数，了解一下什么用
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            preserveWhitespace: false
                        }
                    }
                ]
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
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'less-loader',
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
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.md$/,
                use: [
                    {
                        loader: 'vue-loader'
                    },
                    {
                        loader: require.resolve('./loaders/md-loader.js')
                    }
                ]
            },
            {
                test: /\.st$/,
                use: [
                    {
                        loader: 'vue-loader'
                    },
                    {
                        loader: require.resolve('./loaders/st-loader.js')
                    }
                ]
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
    optimization: {
        runtimeChunk: {
            name: entrypoint => `manifest~${entrypoint.name}`
        },
        minimizer: [
            // 配置UglifyJsPlugin压缩js文件
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            // 配置css文件压缩
            new OptimizeCSSAssetsPlugin({
                cssProcessor: require('cssnano'),
                cssProcessorOptions: {
                    discardComments: {
                        removeAll: true
                    },
                    // 避免 cssnano 重新计算 z-index
                    safe: true
                },
                canPrint: false
            })
        ]
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            vue: 'vue/dist/vue.runtime.esm.js',
            '@': src,
            site: site
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            'process.env.BVIEWPREFIX': JSON.stringify(namePrefixer),
            PRODUCTIONBVIEWPREFIX: `process.env.BVIEWPREFIX ? process.env.BVIEWPREFIX : "${namePrefixer}"`
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './site/index.html' //模板文件
        }),
        new MiniCssExtractPlugin({
            filename: cssFilename
        })
    ]
};
// merge config
module.exports = webpackConfig;

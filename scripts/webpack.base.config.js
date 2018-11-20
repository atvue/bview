/**
 * 通用webpack配置
 */

const { src } = require('./project-path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    // 加载器
    module: {
        rules: [
            // .vue文件
            // @TODO iview中向vue-loader传入了postLoader参数，了解一下什么用
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader'
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
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            vue: 'vue/dist/vue.esm.js',
            '@': src
        }
    },
    plugins: [new VueLoaderPlugin()]
};

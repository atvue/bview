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
                        loader: 'vue-loader' ,
                        options: {
                            preserveWhitespace: false ,
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
            } ,
            // eslint
            {
                enforce: "pre" ,
                test: /\.(js|vue)$/ ,
                // .md => bview/src/components/button/demo/basic.md.js
                exclude: [ /node_modules/ , /\.md\.js$/, /src\/icons/ ] ,     // 排除解析md文件
                loader: "eslint-loader" ,
                options: {
                    emitWarning: true ,
                } ,
                /**
                 * eslint-vue-plugin 注释语法
                 * https://github.com/vuejs/eslint-plugin-vue/issues/260
                 * https://github.com/vuejs/eslint-plugin-vue/pull/320
                 */
            } ,
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
            vue: 'vue/dist/vue.runtime.esm.js',
            '@': src
        }
    },
    plugins: [new VueLoaderPlugin()]
};

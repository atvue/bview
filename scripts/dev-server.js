// webpack-dev-server --open --inline --hot --port 8022 --config scripts/webpack.dev.config.js

const path = require( 'path' )
const HtmlWebpackPlugin = require( 'html-webpack-plugin' )
const webpack = require( 'webpack' )
const webpackBaseConfig = require( './webpack.base.config.js' )
const merge = require('webpack-merge')
const webpackDevServer = require( 'webpack-dev-server' )
const { site } = require( './project-path' )

const siteResolve = ( ...args ) => path.resolve( site , ...args )
const port = 8022 ,
    host = 'localhost'
const config = merge( webpackBaseConfig , {
    devtool: 'eval-source-map',
    mode: 'development',
    entry: {
        index: siteResolve( 'index.js' ) ,
        vendors: [ 'vue', 'vue-router' ]
    },
    output: {
        path: siteResolve( '../dist' ) ,
        publicPath: '' ,
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    } ,
    plugins: [
        new HtmlWebpackPlugin( {
            inject: true,
            filename: siteResolve( '../dist' , 'index.html' ) ,
            template: siteResolve( 'index.html' ) ,
        } ) ,
        new webpack.HotModuleReplacementPlugin() ,
    ]
} )

const devOptions = {
    contentBase: [ site ] ,
    proxy: {

    } ,
    hot: true ,
    compress: true ,
    inline: true ,
    disableHostCheck: true ,
    stats: {
        colors: true ,
    } ,
    port ,
    host ,
}
webpackDevServer.addDevServerEntrypoints( config , devOptions )

const webpackCompiler = webpack( config )
const server = new webpackDevServer( webpackCompiler , devOptions )

server.listen( port , host , function() {
    console.log( `bview is running at http://${host}:${port}` )
} )


const path = require( `path` ) ;
const HtmlWebpackPlugin = require( `html-webpack-plugin` ) ;
const webpack = require( `webpack` ) ;
const webpackBaseConfig = require( `./webpack.base.config.js` ) ;
const merge = require( `webpack-merge` ) ;
const webpackDevServer = require( `webpack-dev-server` ) ;
const { site } = require( `./project-path` ) ;
const { generateComponentRoute } = require( `./site-helper/index` ) ;
const openBrowser = require( `./util/openBrowser` ) ;

const siteResolve = ( ...args ) => path.resolve( site , ...args ) ;
const port = 8022 ,
    host = `localhost` ;

const config = merge( webpackBaseConfig , {
    devtool: `eval-source-map` ,
    mode: `development` ,
    entry: {
        index: siteResolve( `index.js` )
    } ,
    output: {
        path: siteResolve( `../dist` ) ,
        publicPath: `` ,
        filename: `[name].js` ,
        chunkFilename: `[name].chunk.js`
    } ,
    plugins: [
        new HtmlWebpackPlugin( {
            inject: true ,
            filename: siteResolve( `../dist` , `index.html` ) ,
            template: siteResolve( `index.html` )
        } ) ,
        new webpack.HotModuleReplacementPlugin()
    ]
} ) ;

const devOptions = {
    contentBase: [ site ] ,
    hot: true ,
    compress: true ,
    inline: true ,
    disableHostCheck: true ,
    stats: {
        colors: true
    } ,
    port ,
    host
} ;

async function devServer() {
    try {
        await generateComponentRoute() ;

        webpackDevServer.addDevServerEntrypoints( config , devOptions ) ;

        const webpackCompiler = webpack( config ) ,
            server = new webpackDevServer( webpackCompiler , devOptions ) ,
            url = `http://${host}:${port}` ;

        server.listen( port , host , function() {
            console.log( `bview is running at ${url}` ) ;
            openBrowser( url ) ;
        } ) ;
    } catch ( e ) {
        console.warn( e ) ;
    }
}

devServer() ;

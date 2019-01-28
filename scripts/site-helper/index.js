// 自动生成组件路由 [ { path: '...' , mata: { name: '...' } } ]
const { siteComponentsReadMeSortedConfig } = require( `./componentsReadme` ) ;
const { writeRouteConfig } = require( `./writeRouteConfig` ) ;

async function generateComponentRoute() {
    try {
        let componentConfigs = await siteComponentsReadMeSortedConfig() ;
        writeRouteConfig( componentConfigs ) ;
    } catch ( e ) {
        console.warn( e ) ;
    }
}

module.exports = {
    generateComponentRoute
} ;

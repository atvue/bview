import Vue from 'vue'
import Router from 'vue-router'
import { componentRoutes } from './cptRoutes'
import { resetGroup } from './cpGroups'
import { waterfall } from './waterfall'
import { sortDemo } from './sortDemo'
Vue.use( Router )
import rootRoute from './rootRoute'

const requireComponent = require.context( `@/components/` , true , /.*\.st$/ )

let components = {}

// 获取组件文档入口
requireComponent.keys().forEach( fileName => {
    let name = fileName.split( `/` )[ 1 ] ,
        component = requireComponent( fileName )
    // debugger;
    components[ name ] = component.default || component
} )

// 获取组件demo
const requireDemos = require.context( `@/components/` , true , /.*\.md$/ )

let demos = {}
requireDemos.keys().forEach( fileName => {
    let name = fileName.split( `/` )[ 1 ] ,
        demo = requireDemos( fileName ) ,
        resolveDemo = demo.default || demo
    if ( demos[ name ] === undefined ) {
        demos[ name ] = [ resolveDemo ]
    } else {
        demos[ name ].push( resolveDemo )
    }
} )

// 路由配置
// 规定组件说明展示顺序
let componentsRouteConfig = componentRoutes.map( ele => {
    let { path } = ele ,
        docComp = components[ path ] ,
        demoComps = demos[ path ]
    demoComps.sort( sortDemo )
    // 插入demo
    let wrapperComp = Vue.extend( {
        render: h => {
            let waterFallVNode = waterfall( demoComps , h )
            return h( docComp , [ waterFallVNode ] )
        } ,
    } )
    ele.component = wrapperComp
    return ele
} )

// 添加组件说明路由结构
let routes = resetGroup( componentsRouteConfig , rootRoute )
// let routes = [
//     // {
//     //     path: '/introduce',
//     //     component: Introduce,
//     //     alias: '/',
//     //     meta: { name: '简介' }
//     // } ,
//     {
//         path: '/components',
//         redirect: '/components/button',
//         component: rootRoute,
//         meta: { name: '组件' },
//         children: componentsRouteConfig
//     }
// ];

const router = new Router( {
    routes: [ ...routes ] ,
} )

export default router

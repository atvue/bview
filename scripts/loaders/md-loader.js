const markdown = require( 'markdown-it' )
const hljs = require( 'highlight.js' )
const { transform2RelativePath } = require( '../project-path' )
const { parse } = require( '../sfc-transform/template2Render' )
const mdHasNoVueCodeWarning = filePath => `<template>
                <div>
                    <code>${ filePath }</code><br/>
                    未定义：<br/>
                    \`\`\`vue<br/>
                    // ...SFC code<br/>
                    \`\`\`<br/>
                </div>
            </template>`,
        vueCodeReg = /(```\s*vue\s[\s\S]*?```)/ ,
        extractVueReg = /```\s*vue\s([\s\S]*)```/ ,
        extractVue = str => {
            let result = str.match( extractVueReg )
            if ( result ) {
                return result[ 1 ]
            } else {
                return undefined
            }
        }
// 用xml的解析规则高亮
hljs.registerLanguage( 'vue' , require('highlight.js/lib/languages/xml') )

module.exports = function( source , map , meta ) {
    const callback = this.async() ,
        { resourcePath } = this ,
        relativePath = transform2RelativePath( resourcePath ) ,
        mdFragments = source.split( vueCodeReg )
    
    const md = markdown( {
            html: true ,
            typographer: true ,
            highlight: function ( str, lang ) {
                let className = `md-code-${ lang }`
                if ( lang && hljs.getLanguage( lang ) ) {
                    try {
                        let html = hljs.highlight( lang , str , true ).value
                        return `<pre class="hljs ${ className }"><code>${ html }</code></pre>`
                    } catch ( e ) {
                        callback( e )
                    }
                }
                let html = md.utils.escapeHtml( str )
                return `<pre class="hljs ${ className }"><code>${ html }</code></pre>`
            } ,
        } )
    let vueComponents = [] ,
        dealFragments = mdFragments.map( ( mdStr , index ) => {
            let isVueCode = vueCodeReg.test( mdStr ) ,
                mdHtml = md.render( mdStr )
            if ( isVueCode ) {
                let content = extractVue( mdStr ) ,
                    name = `Demo${index}Component` ,
                    vueComponent = {
                        name ,
                        content ,
                    }
                vueComponents.push( vueComponent )
                return [
                    `<div class="md-live-vue">
                        <${name} />
                    </div>` ,
                    mdHtml ,
                ]
            }
            return [ mdHtml ]
        } ) ,
        html2 = [].concat( ...dealFragments ).join('')
    const tokens = md.parse( source ) ,
        vueModule = tokens.find( ( { type , tag , info } ) => type === 'fence' && tag === 'code' && info === 'vue' ) ,
        hasVueModule = vueModule !== undefined
    if ( hasVueModule ) {
        let componentToPromise = vueComponents.map( async ( { name , content } ) => {
            let vueDemoModule = await parse( content , name )
            return vueDemoModule
        } )
        Promise.all( componentToPromise ).then( es6Modules => {
            let jsStr = es6Modules.join(';\n') ,
                components = vueComponents.map( ( { name } ) => name ).join( ',' )
            let vueModuleStr = `
                        <template>
                            <div class="md-live-vue-with-md">
                                <div class="markdown">${ html2 }</div>
                            </div>
                        </template>
                        <script>
                            // md中vue组件 source code
                            ${ jsStr }
                            // 注册md中的vue组件
                            export default {
                                components: { ${ components } }
                            }
                        </script>
                        <style type="less">
                        .md-live-vue-with-md {
                            margin-top: 20px ;
                        }
                        .md-live-vue {
                            margin-top: 20px ;
                            margin-bottom: 20px ;
                        }
                        </style>
                    `
            callback( null , vueModuleStr , map , meta )
        } ).catch( callback )
    } else {
        callback( null , mdHasNoVueCodeWarning( relativePath ) , map , meta )
    }
}
const markdown = require( 'markdown-it' )
const hljs = require( 'highlight.js' )
const { transform2RelativePath } = require( '../project-path' )
const { parse } = require( '../sfc-transform/template2Render' )
const mdHasNoVueCodeWarning = filePath => `<template>
                <div>
                    <code>${ filePath }</code><br/>
                    未定义：<br/>
                    <code>
                        \`\`\`vue<br/>
                        // ...vue code<br/>
                        \`\`\`<br/>
                    </code>
                </div>
            </template>`,
        vueCodeReg = /(```vue[\s\S]*?```)/ ,
        extractVueReg = /```vue([\s\S]*)```/ ,
        extractVue = str => {
            let result = str.match( extractVueReg )
            if ( result ) {
                return result[ 1 ]
            } else {
                return undefined
            }
        }

module.exports = function( source , map , meta ) {
    const callback = this.async() ,
        { resourcePath } = this ,
        relativePath = transform2RelativePath( resourcePath ) ,
        mdFragments = source.split( vueCodeReg )
    
    const md = markdown( {
            html: true ,
            typographer: true ,
            highlight: function ( str, lang ) {
                if ( lang && hljs.getLanguage( lang ) ) {
                    try {
                        return `<pre class="hljs"><code>${ hljs.highlight( lang , str , true ).value }</code></pre>`
                    } catch ( e ) {
                        throw e
                    }
                }
                return `<pre class="hljs"><code>${  md.utils.escapeHtml( str ) }</code></pre>`
            } ,
        } )
    let vueComponents = [] ,
        dealFragments = mdFragments.map( ( mdStr , index ) => {
            let isVueCode = vueCodeReg.test( mdStr ) ,
                mdHtml = md.render( mdStr )
            if ( isVueCode ) {
                let content = extractVue( mdStr ) ,
                    name = `demo${index}` ,
                    vueComponent = {
                        name ,
                        content ,
                    }
                vueComponents.push( vueComponent )
                return [
                    `<${name} />` ,
                    mdHtml ,
                ]
            }
            return [ mdHtml ]
        } ) ,
        html2 = [].concat( ...dealFragments ).join('')
    
    const html = md.render( source ) ,
        tokens = md.parse( source ) ,
        vueModule = tokens.find( ( { type , tag , info } ) => type === 'fence' && tag === 'code' && info === 'vue' ) ,
        hasVueModule = vueModule !== undefined
    callback( null , mdHasNoVueCodeWarning( relativePath ) , map , meta )
    vueComponents.map( async ( { name , content } ) => {
        let vueDemoModule = await parse( content , name )
        console.log( 123 , vueDemoModule , 'abc' )
    } )
    return
    if ( hasVueModule ) {
        let { content } = vueModule
        parse( content ).then( vueDemoModule => {
            let vueModuleStr = `
                    <template>
                        <div class="md-example-block">
                            <div class="markdown">${ html2 }</div>
                        </div>
                    </template>
                    <script>
                        import 'highlight.js/styles/default.css' //样式文件
                        // demo 组件
                        ${ vueDemoModule }
                        // markdown 组件
                        export default {
                            components: { demo }
                        }
                    </script>
                    <style type="less">
                    .md-example-block {
                        marigin-top: 20px ;
                    }
                    </style>
                `
            callback( null , vueModuleStr , map , meta )
        } ).catch( callback )
    } else {
        callback( null , mdHasNoVueCodeWarning( relativePath ) , map , meta )
    }
}
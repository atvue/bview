const markdown = require( 'markdown-it' )
const hljs = require( 'highlight.js' )
const { transform2RelativePath } = require( '../project-path' )
const { parse } = require( '../sfc-transform/template2Render' )


module.exports = function( source , map , meta ) {
    const callback = this.async()
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
    const html = md.render( source ) ,
        tokens = md.parse( source ) ,
        vueModule = tokens.find( ( { type , tag , info } ) => type === 'fence' && tag === 'code' && info === 'vue' ) ,
        hasVueModule = vueModule !== undefined
    if ( hasVueModule ) {
        let { content } = vueModule
        parse( content ).then( vueDemoModule => {
            let vueModuleStr = `
                    <template>
                        <div>
                            <div>
                                <demo />
                            </div>
                            <div>
                                <div class="markdown">${ html }</div>
                            </div>
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
                `
            callback( null , vueModuleStr , map , meta )
        } ).catch( callback )
    } else {
        let { resourcePath } = this
            relativePath = transform2RelativePath( resourcePath )
        let mdHasNoVueCodeWarning = `<template>
                <div>
                    <code>${ relativePath }</code><br/>
                    未定义：<br/>
                    <code>
                        \`\`\`vue<br/>
                        // ...vue code<br/>
                        \`\`\`<br/>
                    </code>
                </div>
            </template>`
        callback( null , mdHasNoVueCodeWarning , map , meta )
    }
}
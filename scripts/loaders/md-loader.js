const markdown = require( 'markdown-it' )
const hljs = require( 'highlight.js' )
const fse = require( 'fs-extra' )
const path = require( 'path' )
const { parse } = require( '../sfc-transform/template2Render' )


module.exports = function( source ) {
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
                        <div class="markdown">${ html }</div>
                    </template>
                    <script>
                        import 'highlight.js/styles/default.css' //样式文件
                        // demo 组件
                        ${ vueDemoModule }
                        // markdown 组件
                        export default {}
                    </script>
                `
            callback( null , vueModuleStr )
        } ).catch( callback )
    }
    
}
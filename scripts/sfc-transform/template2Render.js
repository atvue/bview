const compiler = require( `vue-template-compiler` )
const transpile = require( `vue-template-es2015-compiler` )
const NullSFCScriptExport = `export default {}`
const babel = require( `@babel/core` )
const babelPluginImportBview = require( `../babel-helper/babel-plugin-import-bview` )
const babelPluginDefault2Export = require( `../babel-helper/babel-plugin-default2export` )
const { parseStyles } = require( `./parseStyles` )
const withStatement2RenderFunction = withStmt => {
    return transpile( `function render() { ${withStmt} }` )
}
/**
 * 1、<template></template> <scritpt></scritpt> -> vue Object literal

 * 2、script part
    * do three things

    * 2.1、import { Button } from 'bview';   ->   import Buttom from '@/components/button'
                                                  import "@/components/button/style/index.js";
    * 2.2、export default {                       export const demo = {
            components: {                               components: {
                Button ,                     ->              Button ,
            }                                           } ,
                                                        render: function render(){
                                                            // ....
                                                        } ,
                                                        staticRenderFns: [ ... ] ,   // render code for static sub trees, if any
        }                                         }
    * 2.3、<style />,<style type="less" />   ->    css text
 *
 */
const parse = ( content , name , metadata ) => {
    return new Promise( async ( r , j ) => {
        if (
            content === undefined ||
            content === null ||
            content.trim() === ``
        ) {
            return j( new Error( `解析的vue文件内容不能为空` ) )
        }
        let vueDescriptor = compiler.parseComponent( content ) ,
            { template , script , styles } = vueDescriptor ,
            scriptTxt = script ? script.content : NullSFCScriptExport ,
            templateTxt = template ? template.content : `` ,
            result = compiler.compile( templateTxt ) ,
            { render , staticRenderFns , errors } = result

        if ( errors.length > 0 ) {
            let parseTemplateError = new Error(
                `编译vue的template文件出错，${errors}` ,
            )
            return j( parseTemplateError )
        }
        let compiledStyle = parseStyles( styles , metadata ) ,
            compileSFC = babel
                .transformAsync( scriptTxt , {
                    ast: true ,
                    code: false ,
                    sourceType: `module` ,
                    plugins: [
                        [ babelPluginImportBview , { libraryName: `bview` } ] ,
                        [
                            babelPluginDefault2Export ,
                            {
                                render: withStatement2RenderFunction( render ) ,
                                staticRenderFns: `[${staticRenderFns
                                    .map( withStatement2RenderFunction )
                                    .join( `,` )}]` ,
                                exportName: name ,
                            } ,
                        ] ,
                    ] ,
                } )
                .then( ( { ast } ) => babel.transformFromAstAsync( ast ) ) ,
            waitCssAndSFC = [ compiledStyle , compileSFC ]
        try {
            let [ cssTxt , sfc ] = await Promise.all( waitCssAndSFC ) ,
                end = {
                    name ,
                    cssTxt ,
                    codeTxt: sfc.code ,
                }
            r( end )
        } catch ( e ) {
            j( e )
        }
    } )
}

/* const tmp = `<template>
    <div>
        123<Button />
    </div>
</template>

<script>
import { Button } from 'bview'

export default {
    components: { Button } ,
}
</script>
<style>
    body { color: #fff ; }
</style>
<style type="less">
    // less
    body { color: #f00 ; p { color: #f00 } }
</style>
`
parse( tmp , `Demo1component` , { context: __dirname } ).then( data => {
    console.log( data )
} ).catch( e => console.log( `解析vue模板失败` , e ) )
 */

exports.parse = parse

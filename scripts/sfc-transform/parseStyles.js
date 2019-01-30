const chalk = require( `chalk` )
const less = require( `less` )
const TYPESTYLE = `style` ,
    TYPESTYLELESS = `less`
// 错误消息栈提取第一行信息
const regFirstStack = /(at.*\(.*\))/u ,
    extraFirstStack = str => {
        let result = str.match( regFirstStack )
        if ( result !== null ) {
            return result[ 0 ]
        }
    }
const lessConfig = {
    paths: [] , // Specify search paths for @import directives
    filename: `md_vue_style.less` , // Specify a filename, for better error messages
    compress: false , // Minify CSS output
    sourceMap: {
        sourceMapFileInline: true , // sourcemap Inline
    } ,
}

function toStyle( style ) {
    let { type , attrs , content } = style ,
        { type: preProcessor } = attrs ,
        isStyle = type === TYPESTYLE
    return new Promise( ( resolve , reject ) => {
        if ( isStyle ) {
            switch ( preProcessor ) {
                // css
                case undefined: {
                    resolve( content )
                    break
                }
                // less
                case TYPESTYLELESS: {
                    less.render( content , lessConfig )
                        .then( output => {
                            let { css } = output // css,map,imports
                            resolve( css )
                        } )
                        .catch( e => {
                            let error = new Error(
                                `\nless error:${e.message}\n${e.extract.join(
                                    `\n` ,
                                )}` ,
                            )
                            // error.origin_error = e
                            reject( error )
                        } )
                    break
                }
                default: {
                    let msg = `parseStyles.js 暂不支持CSS预处理器：<style type="${preProcessor}" />` ,
                        error = new Error() ,
                        file = extraFirstStack( error.stack )
                    console.warn( chalk.red( msg ) , chalk.green( file ) )
                    resolve( undefined )
                    break
                }
            }
        }
    } )
}

async function parseStyles( styles = [] ) {
    let promises = styles.map( toStyle ) ,
        results
    try {
        results = await Promise.all( promises )
    } catch ( e ) {
        return Promise.reject( e )
    }
    let stylesTxt = results.reduce( ( prev , next ) => {
        if ( next ) {
            return prev + `\n` + next
        }
        return prev
    } , `` )
    return stylesTxt
}

exports.parseStyles = parseStyles

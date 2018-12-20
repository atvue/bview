const { existsFile } = require( '../fs-helper/existsFile' )
const readFile = require( '../fs-helper/readFile' )
const yaml = require('js-yaml')
const yamlReg = /---([\s\S]*?)---/

// 提取yaml字符内容
function getYamlContent( str ){
    if ( str === null || str === undefined || str.trim() === '' ) {
        return undefined
    }
    let result = str.match( yamlReg )
    if ( result === null ) {
        return undefined
    } else {
        let yamlStr = result[ 1 ]
        return yamlStr
    }
}


module.exports = async function readMeConfig( file ) {
    if ( file === undefined || file === null ) {
        return undefined
    }
    try {
        await existsFile( file )
        let content = await readFile( file ) ,
            yamlStr = getYamlContent( content )
        if ( yamlStr ) {
            try {
                let config = yaml.safeLoad( yamlStr )
                return config
            } catch( e ) {
                console.warn( `文件：${file},的yaml语法错误` , e )
            }
        }
    } catch ( e ) {
        console.warn( e )
    }
    return undefined 
}
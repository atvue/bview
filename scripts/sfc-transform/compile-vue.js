const config = require( `./config` ) ,
    path = require( `path` ) ,
    { srcDir , toLibPath , toShortPath } = config ,
    { readFile , writeFile } = require( `./util` ) ,
    parseVueFile = require( `./parseVueFile` ) ,
    chalk = require( `chalk` )

const glob = require( `glob` )
const subfixVue2JS = /\.vue$/

// 查找所有vue文件
async function findVueFiles() {
    let files = await new Promise( ( r , j ) => {
        glob( `${srcDir}/**/*.vue` , function( er , files ) {
            if ( er ) {
                return j( er )
            }
            return r( files )
        } )
    } )
    return files
}

async function init() {
    let files
    try {
        files = await findVueFiles()
    } catch ( e ) {
        throw e
    }
    files.forEach( filePath => {
        let mirrorLibPath = toLibPath( filePath )
        readFile( filePath , async content => {
            let code
            try {
                code = await parseVueFile( content )
            } catch ( e ) {
                let short = toShortPath( filePath ) ,
                    { base } = path.parse( filePath ) ,
                    error = `错误❌:文件：${short}，消息：${e}(转译lib目录中，将不会生成${base})`
                console.log( chalk.red( error ) )
                // 有错误,返回
                return
            }
            if ( code !== undefined ) {
                const path2JS = mirrorLibPath.replace( subfixVue2JS , `.js` )
                writeFile( path2JS , code )
            }
        } )
    } )
}

exports.compileVue = init

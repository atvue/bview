const config = require( `./config` ) ,
    { srcDir , toLibPath } = config ,
    { readFileSync , writeFile } = require( `./util` ) ,
    glob = require( `glob` );

// 查找所有less文件
async function findLessFiles() {
    let files = await new Promise( ( r , j ) => {
        glob( `${srcDir}/**/*.less` , function( er , files ) {
            if ( er ) {
                return j( er );
            }
            return r( files );
        } );
    } );
    return files;
}

async function init() {
    let files;
    try {
        files = await findLessFiles();
    } catch ( e ) {
        throw e;
    }
    files.forEach( file => {
        let code = readFileSync( file ) ,
            libFile = toLibPath( file );
        writeFile( libFile , code );
    } );
}

exports.copyLess = init;

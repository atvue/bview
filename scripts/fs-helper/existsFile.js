const fs = require( `fs` )

const existsFile = function( filename ) {
    return new Promise( ( complete , fail ) => {
        fs.access( filename , fs.R_OK | fs.W_OK , err => {
            if ( err ) {
                fail( err )
            } else {
                complete()
            }
        } )
    } )
}

const existsFileSync = function( filename ) {
    try {
        fs.accessSync( filename , fs.constants.R_OK | fs.constants.W_OK )
        return true
    } catch ( err ) {
        return false
    }
}

exports.existsFile = existsFile

exports.existsFileSync = existsFileSync

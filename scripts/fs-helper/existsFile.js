const fs = require('fs')



module.exports = function( filename ) {
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
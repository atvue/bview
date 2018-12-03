const fse = require( 'fs-extra' )

module.exports = function writeFile( filePath , content ) {
    return new Promise( ( r , j ) => {
        fse.outputFile( filePath , content , err => {
            if ( err ) {
                j( err )
            } else {
                r()
            }
        } )
    } )
}
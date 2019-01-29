const fs = require( `fs` )

module.exports = function readFile( file ) {
    return new Promise( ( r , j ) => {
        fs.readFile( file , `utf8` , function( error , content ) {
            if ( error ) {
                j( error )
            } else {
                r( content )
            }
        } )
    } )
}

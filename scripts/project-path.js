const path = require( 'path' )

const root = process.cwd()

function resolvePath( dir ) {
    return path.resolve( root , dir )
}


module.exports = {
    site: resolvePath( './site' ) ,
    src: resolvePath( './src' )
}
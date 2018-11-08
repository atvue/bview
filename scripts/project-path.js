const path = require( 'path' )

const root = process.cwd()

function resolvePath( dir ) {
    return path.resolve( root , dir )
}

const src = resolvePath( './src' )

function transform2RelativePath( path ) {
    let remainPath = path.replace( `${root}/` , ''  )
    return remainPath
}

module.exports = {
    site: resolvePath( './site' ) ,
    src ,
    transform2RelativePath ,
}
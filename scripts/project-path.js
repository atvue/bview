const path = require( `path` )

const root = process.cwd()

function resolvePath( ...args ) {
    return path.resolve( root , ...args )
}

const src = resolvePath( `./src` )

function transform2RelativePath( path ) {
    let remainPath = path.replace( `${root}/` , `` )
    return remainPath
}

module.exports = {
    src ,
    site: resolvePath( `site` ) ,
    components: resolvePath( `src` , `components` ) ,
    transform2RelativePath
}


module.exports = function( babel ) {
    let { types } = babel
    return {
        visitor: {
            ImportDeclaration( path , state ) {
                const { node } = path;
                // path maybe removed by prev instances.
                if ( !node ) return
                const { value } = node.source
                const { libraryName } = state.opts
                const specifiers = path.node.specifiers ,
                    declarations = []
                if ( value === libraryName ) {
                    specifiers.forEach( spec => {
                        if ( types.isImportSpecifier( spec ) ) {
                            let lowerCaseComponentName = spec.local.name.toLowerCase() ,
                                sourceStr = `@/components/${ lowerCaseComponentName }`
                            let dec = types.ImportDeclaration(
                                [
                                    types.importDefaultSpecifier( spec.local ) ,
                                ] ,
                                types.StringLiteral( sourceStr )
                            )
                            declarations.push( dec )
                        }
                    } )
                    if ( declarations.length > 0 ) {
                        path.replaceWithMultiple( declarations )
                    }
                }
            }
        }
    }
}

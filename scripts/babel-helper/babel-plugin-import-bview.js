module.exports = function( babel ) {
    let { types } = babel;
    return {
        visitor: {
            ImportDeclaration( path , state ) {
                const { node } = path;
                // path maybe removed by prev instances.
                if ( !node ) return;
                const { value } = node.source;
                const { libraryName } = state.opts;
                const specifiers = path.node.specifiers ,
                    declarations = [];
                if ( value === libraryName ) {
                    specifiers.forEach( spec => {
                        // 单个导入
                        if ( types.isImportSpecifier( spec ) ) {
                            let lowerCaseComponentName = spec.local.name.toLowerCase() ,
                                sourceStr = `@/components/${lowerCaseComponentName}` ,
                                styleSourceStr = `@/components/${lowerCaseComponentName}/style/index.js`;
                            let decModule = types.ImportDeclaration(
                                    [ types.importDefaultSpecifier( spec.local ) ] ,
                                    types.StringLiteral( sourceStr )
                                ) ,
                                decStyle = types.ImportDeclaration(
                                    [] ,
                                    types.StringLiteral( styleSourceStr )
                                );
                            declarations.push( decModule );
                            declarations.push( decStyle );
                            // 默认导入
                        } else if ( types.isImportDefaultSpecifier( spec ) ) {
                            let importIndexId = types.ImportDeclaration(
                                    [ types.importDefaultSpecifier( spec.local ) ] ,
                                    types.StringLiteral( `@` )
                                ) ,
                                importIndexStyleId = types.ImportDeclaration(
                                    [] ,
                                    types.StringLiteral( `@/style.less` )
                                );
                            declarations.push( importIndexId );
                            declarations.push( importIndexStyleId );
                        }
                    } );
                    if ( declarations.length > 0 ) {
                        path.replaceWithMultiple( declarations );
                    }
                }
            }
        }
    };
};

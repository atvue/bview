/**
 * export default {}  -> export const demo = {}
 */
const template = require( `@babel/template` ).default

module.exports = function( babel ) {
    let { types } = babel ,
        t = types
    return {
        visitor: {
            ExportDefaultDeclaration( path , state ) {
                let { node } = path ,
                    {
                        opts: {
                            render ,
                            staticRenderFns ,
                            exportName ,
                            yamlConfig ,
                        } ,
                    } = state
                exportName = exportName ? exportName : `demo`
                if ( !node ) return
                let { declaration } = node
                if ( declaration.type !== `ObjectExpression` ) {
                    return
                }
                let renderObjectPropertyId = t.objectProperty(
                        t.identifier( `render` ) ,
                        t.identifier( render ) ,
                    ) , // { render: function(){ ... } }
                    staticObjectPropertyId = t.objectProperty(
                        t.identifier( `staticRenderFns` ) ,
                        t.identifier( staticRenderFns ) ,
                    ) , // { staticRenderFns: [ function(){ ... } ] }
                    yamlConfigObjectPropertyId = t.objectProperty(
                        t.identifier( `__yamlConfig` ) ,
                        t.identifier(
                            yamlConfig
                                ? JSON.stringify( yamlConfig )
                                : `undefined` ,
                        ) ,
                    ) // { __yamlConfig: { "order":0 } }
                // insert key render
                declaration.properties.push( renderObjectPropertyId )
                declaration.properties.push( staticObjectPropertyId )
                declaration.properties.push( yamlConfigObjectPropertyId )
                // export default -> export const demo = ...
                let exportDemoDec = template( `
                        export const ${exportName} = EXPORTDEFAULT
                    ` ) ,
                    ast = exportDemoDec( { EXPORTDEFAULT: declaration } )
                // replace export default
                path.replaceWithMultiple( ast )
            } ,
        } ,
    }
}

/**
 * export default {}  -> export const demo = {}
 */
const template = require('@babel/template').default;


module.exports = function( babel ) {
    let { types } = babel ,
        t = types
    return {
        visitor: {
            ExportDefaultDeclaration( path , state ) {
                let { node } = path ,
                    { opts: { render , exportName } } = state
                exportName = exportName ? exportName : 'demo'
                if ( !node ) return
                let { declaration } = node
                if ( declaration.type !== 'ObjectExpression' ) {
                    return
                }
                let renderId = t.identifier( 'render' ) ,
                    renderAst = t.identifier( render ) ,
                    renderValueId = renderAst ,
                    objectPropertyId = t.objectProperty( renderId , renderValueId ) // { render: function(){ ... } }
                // insert key render
                declaration.properties.push( objectPropertyId )
                // export default -> export const demo = ...
                let exportDemoDec = template( `
                        export const ${ exportName } = EXPORTDEFAULT
                    ` ) ,
                    ast = exportDemoDec( { EXPORTDEFAULT: declaration } )
                // replace export default
                path.replaceWithMultiple( ast )
            }
        }
    }
}

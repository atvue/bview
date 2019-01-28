/**
 * export default {}  -> export const demo = {}
 */
const template = require( `@babel/template` ).default ;

module.exports = function( babel ) {
    let { types } = babel ,
        t = types ;
    return {
        visitor: {
            ExportDefaultDeclaration( path , state ) {
                let { node } = path ,
                    {
                        opts: { render , staticRenderFns , exportName }
                    } = state ;
                exportName = exportName ? exportName : `demo` ;
                if ( !node ) return ;
                let { declaration } = node ;
                if ( declaration.type !== `ObjectExpression` ) {
                    return ;
                }
                let renderId = t.identifier( `render` ) ,
                    renderValueId = t.identifier( render ) ,
                    staticRenderFnsId = t.identifier( `staticRenderFns` ) ,
                    staticRenderFnsValue = t.identifier( staticRenderFns ) ,
                    renderObjectPropertyId = t.objectProperty(
                        renderId ,
                        renderValueId
                    ) , // { render: function(){ ... } }
                    staticObjectPropertyId = t.objectProperty(
                        staticRenderFnsId ,
                        staticRenderFnsValue
                    ) ; // { staticRenderFns: [ function(){ ... } ] }

                // insert key render
                declaration.properties.push( renderObjectPropertyId ) ;
                declaration.properties.push( staticObjectPropertyId ) ;
                // export default -> export const demo = ...
                let exportDemoDec = template( `
                        export const ${exportName} = EXPORTDEFAULT
                    ` ) ,
                    ast = exportDemoDec( { EXPORTDEFAULT: declaration } ) ;
                // replace export default
                path.replaceWithMultiple( ast ) ;
            }
        }
    } ;
} ;

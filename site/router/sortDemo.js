export const sortDemo = ( a , b ) => {
    let { __yamlConfig: aConfig } = a ,
        { __yamlConfig: bConfig } = b ,
        aOrder ,
        bOrder
    if ( aConfig ) {
        aOrder = aConfig.order
    }
    if ( bConfig ) {
        bOrder = bConfig.order
    }
    if ( aOrder !== undefined && bOrder !== undefined ) {
        return aOrder - bOrder
    } else {
        if ( aOrder !== undefined ) {
            return -1
        }
        if ( bOrder !== undefined ) {
            return 1
        }
        return 0
    }
}

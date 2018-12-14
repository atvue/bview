


export const timeout = ( time = 1000 ) => {
    return new Promise( r => {
        setTimeout( () => r() , time )
    } )
}

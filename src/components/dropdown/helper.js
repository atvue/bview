let regHump = /([a-z])[a-z]*([A-Z])[a-zA-Z]*/


function simplifier( placement ) {
    let result = placement.match( regHump ) ,
        hasResult = result !== null
    if ( hasResult ) {
        return [
            result[ 1 ] ,
            result[ 2 ].toLowerCase() ,
        ]
    } else {
        return undefined
    }
}

export function placementToPoints( placement ){
    let sourcePoints = [ 't' , 'c' ] ,
        targetPoints = [ 'b' , 'c' ] ,
        [ upDown , leftRight ] = simplifier( placement )
    // source
    sourcePoints[ 0 ] = upDown === 'b' ? 't' : 'b'
    sourcePoints[ 1 ] = leftRight
    // target
    targetPoints[ 0 ] = upDown
    targetPoints[ 1 ] = leftRight
    return [ 
        sourcePoints.join('') ,
        targetPoints.join('')
    ] 
}
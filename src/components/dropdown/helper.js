let regHump = /([a-z])[a-z]*([A-Z])[a-zA-Z]*/ ;

// 'bottomLeft' => 'bl'
function simplifier( placement ) {
    let result = placement.match( regHump ) ,
        hasResult = result !== null ;
    if ( hasResult ) {
        return [ result[ 1 ] , result[ 2 ].toLowerCase() ] ;
    } else {
        return undefined ;
    }
}

// 'bottomLeft' => [ 'tl' , 'bl' ]
export function placementToPoints( placement ) {
    let sourcePoints = [ `t` , `c` ] ,
        targetPoints = [ `b` , `c` ] ,
        [ upDown , leftCenterRight ] = simplifier( placement ) ;
    // source
    sourcePoints[ 0 ] = upDown === `b` ? `t` : `b` ;
    sourcePoints[ 1 ] = leftCenterRight ;
    // target
    targetPoints[ 0 ] = upDown ;
    targetPoints[ 1 ] = leftCenterRight ;
    return [ sourcePoints.join( `` ) , targetPoints.join( `` ) ] ;
}

/**
 * github: https://github.com/calebroseland/vue-dom-portal
 */
function getTarget (node = document.body) {
    if (node === true) return document.body
    return node instanceof window.Node ? node : document.querySelector(node)
}
  
const homes = new Map() ,
    defaultConfig = { target: document.body }
  
const domPortal = {
    name: 'dom-portal' ,
    inserted( el , { value } ) {
        let config = Object.assign( {} , defaultConfig , value ) ,
            { target , symbol } = config ,
            parentWrapper = getTarget( target ) ,
            only1Instance = symbol !== undefined && symbol !== null
        if ( only1Instance ) {
            let hasInited = homes.has( symbol )
            if ( hasInited ) {
                let obj = homes.get( symbol ) ,
                    { div , count } = obj
                div.appendChild( el )
                homes.set( symbol , Object.assign( obj , { count: count + 1 } ) )
            } else {
                let div = document.createElement( 'div' )
                div.appendChild( el )
                parentWrapper.appendChild( div )
                homes.set( symbol , {
                    div ,
                    count: 1 ,
                } )
            }
        } else {
            parentWrapper.appendChild( el )
        }
    } ,
    unbind( el , { value } ) {
        let config = Object.assign( {} , value , defaultConfig ) ,
            { symbol } = config ,
            only1Instance = symbol !== undefined && symbol !== null
        if ( only1Instance ) {
            let obj = homes.get( symbol ) ,
                { div , count } = obj ,
                lastOne = count === 1
            if ( lastOne ) {
                if ( el.parentNode ) {
                    el.parentNode.removeChild( el )
                }
                if ( div.parentNode ) {
                    div.parentNode.removeChild( div )
                }
                homes.delete( symbol )
            } else {
                if ( el.parentNode ) {
                    el.parentNode.removeChild( el )
                }
                homes.set( symbol , Object.assign( obj , { count: count - 1 } ) )
            }
        } else {
            if ( el.parentNode ) {
                el.parentNode.removeChild( el )
            }
        }
    }
}
  

export default domPortal
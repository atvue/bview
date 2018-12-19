/**
 * github: https://github.com/calebroseland/vue-dom-portal
 */
function getTarget (node = document.body) {
    if (node === true) return document.body
    return node instanceof window.Node ? node : document.querySelector(node)
}
  
const homes = new Map()
  
const domPortal = {
    name: 'dom-portal' ,
    inserted( el , { value } , vnode) {
        let { id } = el ,
            parentWrapper = getTarget( value ) ,
            canInsert = value !== false ,
            hasId = id !== '' && id !== undefined && id !== null ,
            inited = homes.has( id ) ,
            childNodes = el.hasChildNodes() ? [ ...el.childNodes ] : []

        if ( inited ) {
            let oneInstance = homes.get( id ) ,
                { el: existedEl , count } = oneInstance
            
            for( let i = 0 ; i < childNodes.length ; i++ ) {
                let child = childNodes[ i ]
                existedEl.appendChild( child )
            }
            // fix id conflict
            el.removeAttribute( 'id' )
            el.setAttribute( "data-id" , id )
            // store
            homes.set( id , 
                Object.assign( 
                    oneInstance , 
                    { 
                        count: count + 1 
                    }
                )
            )
            homes.set( el , {
                childNodes ,
            } )
        } else {
            if ( canInsert ) {
                parentWrapper.appendChild( el )
                if ( hasId === false ) {
                    id = el
                }
                homes.set( id , {
                    el ,
                    count: 1 ,
                    childNodes ,
                } )
            }
        }
    } ,
    unbind( el ) {
        let { id } = el ,
            hasId = id !== '' && id !== undefined && id !== null
        if ( hasId === false ) {
            id = el.getAttribute( 'data-id' )
        }
        let inited = homes.has( id ) ,
            hasChildNodes = homes.has( el )
        if ( inited ) {
            let oneInstance = homes.get( id ) ,
                { el , count , childNodes } = oneInstance ,
                lastOne = count === 1
            if ( lastOne ) {
                if ( el.parentNode ) {
                    el.parentNode.removeChild( el )
                }
                homes.delete( id )
            } else {
                homes.set( id ,
                    Object.assign( 
                        oneInstance , 
                        { 
                            count: count - 1 
                        }
                    )
                )
                if ( childNodes ) {
                    childNodes.forEach( el => {
                        if ( el.parentNode ) {
                            el.parentNode.removeChild( el )
                        }
                    } )
                }
            }
        } else {
            if ( el.parentNode ) {
                el.parentNode.removeChild( el )
            }
        }
        if ( hasChildNodes ) {
            let { childNodes } = homes.get( el )
            if ( childNodes ) {
                childNodes.forEach( el => {
                    if ( el.parentNode ) {
                        el.parentNode.removeChild( el )
                    }
                } )
            }
            if ( el.parentNode ) {
                el.parentNode.removeChild( el )
            }
            homes.delete( el )
        }
    }
}
  

export default domPortal
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
        const inited = homes.has( el )
        let hasMovedOut = false
        if ( value !== false ) {
            getTarget( value ).appendChild( el ) // moving into new place
            hasMovedOut = true
        }
        if ( !inited ) {
            homes.set( el , { 
                hasMovedOut
            } )
        }
    } ,
    componentUpdated( el , { value } ) {  // need to make sure children are done updating (vs. `update`)
        const { hasMovedOut } = homes.get( el )
        if ( !hasMovedOut && value ) {
            getTarget(value).appendChild(el)
            homes.set( el , Object.assign({}, homes.get(el), { hasMovedOut: true }))
        } else if ( hasMovedOut && value === false ) {
            homes.set( el , Object.assign( {} , homes.get(el), { hasMovedOut: false }))
        } else if ( value ) {
            getTarget( value ).appendChild( el )
        }
    } ,
    unbind( el ) {
        homes.delete( el )
        if ( el.parentNode ) {
            el.parentNode.removeChild( el )
        }
    }
}
  

export default domPortal
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
        const { parentNode } = el
        const home = document.createComment('')
        let hasMovedOut = false

        if (value !== false) {
            parentNode.replaceChild(home, el) // moving out, el is no longer in the document
            getTarget(value).appendChild(el) // moving into new place
            hasMovedOut = true
        }

        if ( !homes.has( el ) ) {
            homes.set(el, { parentNode, home, hasMovedOut }) // remember where home is or should be
        }
    } ,
    componentUpdated( el , { value } ) {  // need to make sure children are done updating (vs. `update`)
        const { parentNode, home, hasMovedOut } = homes.get( el ) // recall where home is

        if ( !hasMovedOut && value ) {
            // remove from document and leave placeholder
            parentNode.replaceChild(home, el)
            // append to target
            getTarget(value).appendChild(el)

            homes.set(el, Object.assign({}, homes.get(el), { hasMovedOut: true }))
        } else if ( hasMovedOut && value === false ) {
            // previously moved, coming back home
            parentNode.replaceChild(el, home)
            homes.set(el, Object.assign({}, homes.get(el), { hasMovedOut: false }))
        } else if (value) {
            // already moved, going somewhere else
            getTarget(value).appendChild(el)
        }
    } ,
    unbind( el ) {
        homes.delete(el)
    }
}
  

export default domPortal
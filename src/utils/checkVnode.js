


export function isTextVNode( vNode ){
    if ( vNode === undefined || vNode === null ) {
        return false
    }
    if ( vNode.tag === undefined &&
        vNode.data === undefined &&
        vNode.children === undefined &&
        'text' in vNode ) {
        return true
    } else {
        return false
    }
}



export function isTextVNode( vNode ){
    if ( vNode === undefined || vNode === null ) {
        return false
    }
    if ( vNode.tag === undefined &&
        ( vNode.data === undefined || vNode.data.slot ) &&  // vNode.data.slot 测试
        vNode.children === undefined &&
        'text' in vNode ) {
        return true
    } else {
        return false
    }
}
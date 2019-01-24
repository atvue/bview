import { isTextVNode } from '../../../utils/checkVnode'


export function traverseVnode( vNodes , callback ) {
    vNodes.forEach( vNode => {
        callback( vNode )
        let { children } = vNode ,
            hasChild = children !== undefined
        if ( hasChild ) {
            traverseVnode( children , callback )
        }
    } )
}


export function getVnodesTxt( vNodes ){
    if ( vNodes && vNodes.length > 0 ) {
        let txt
        traverseVnode( vNodes , vNode => {
            let ifTextVNode = isTextVNode( vNode )
            if ( ifTextVNode ) {
                let { text } = vNode
                if ( txt === undefined ) {
                    txt = text
                } else {
                    txt += text
                }
            }
        } )
        return txt
    } else {
        return undefined
    }
}



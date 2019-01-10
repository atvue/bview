
import { optionName } from './name'
import { getVnodesTxt } from './traverseVnode'

export const filterOption = vNode => {
    let { componentOptions: op } = vNode ,
        isOptionNode = op !== undefined &&
            op.Ctor !== undefined &&
            op.Ctor.extendOptions.name === optionName
    return isOptionNode
}


export default {
    computed: {
        optionList(){
            let { hasOptions } = this
            if ( hasOptions ) {
                return this.filterAttrBindOptions
            } else {
                let { filterSlotOptions: options } = this ,
                    ops = options
                        .filter( filterOption )
                        .map( vNode => {
                            let { componentOptions: op } = vNode ,
                                { propsData: { value , disabled } , children } = op ,
                                label = getVnodesTxt( children ) ,
                                enabled = disabled === undefined || disabled === false
                            
                            return {
                                value ,
                                label ,
                                disabled: !enabled ,
                            }
                        } )
                return ops
            }
        }
    }
}
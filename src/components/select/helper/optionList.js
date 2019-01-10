
import { optionName } from './name'

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
                                hasTextNode = children[ 0 ] && children[ 0 ] ,
                                enabled = disabled === undefined || disabled === false ,
                                label = undefined
                            if ( hasTextNode ) {
                                label = children[ 0 ].text
                            }
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
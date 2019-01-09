
import { optionName } from './name'


export default {
    computed: {
        optionList(){
            let { hasOptions } = this
            if ( hasOptions ) {
                return this.options
            } else {
                let { default: options } = this.$slots ,
                    hasDefault = options !== undefined ,
                    ops = []
                if ( hasDefault ) {
                    ops = options.filter( vNode => {
                        let { componentOptions: op } = vNode ,
                            isOptionNode = op !== undefined &&
                                op.Ctor !== undefined &&
                                op.Ctor.extendOptions.name === optionName
                        return isOptionNode
                    } ).map( vNode => {
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
                } else {
                    return ops
                }
            }
        }
    }
}
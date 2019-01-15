<template>
    <div 
        v-if="show"
        :class="`${b}-tag`"
    >
        <slot />
        <Icon
            v-if="closable"
            :svg="close"
            :class="`${b}-tag-close`"
            :size="14"
            @click="_clickClose"
        />
    </div>
</template>

<script>
import close from "../../icons/close"
import Icon from "../icon"
import { bviewPrefix as b } from '../../utils/macro'

export default {
    name: 'Tag' ,
    components: { Icon } ,
    props: {
        // @doc 标签是否可关闭
        closable: {
            type: Boolean ,
            default: false ,
        }
    } ,
    data () {
        return {
            b ,
            close ,
            destroyed: false ,
        }
    } ,
    computed:{
        show(){
            return this.destroyed === false
        } ,
    } ,
    methods: {
        _clickClose( event ){
            this.$emit( 'close' , event )
            let { defaultPrevented: prevented } = event ,
                needDestroy = prevented !== true
            if ( needDestroy ) {
                this.destroyed = true
            }
        }
    } ,
}
</script>
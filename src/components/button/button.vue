<template>
    <button
        :disabled="disabled"
        :class="buttonClassName"
        @click.prevent="$_onClick"
    >
        <slot />
        <i v-if="loading" />
    </button>
</template>

<script>
import { bviewPrefix as b } from '../../utils/macro'
const types = [ `default` , `primary` , `dashed` , `text` ]
const typeDefault = types[ 0 ]
const sizes = [ `` , `big` , `small` ]
const SizeDefault = sizes[ 0 ]

export default {
    name: `Button` ,
    props: {
        //@doc是否禁用按钮
        disabled: {
            type: Boolean ,
            default: false ,
        } ,
        //@doc是否需要loading
        loading: {
            type: Boolean ,
            default: false ,
        } ,
        //@doc按钮的大小
        size: {
            validator( value ) {
                return sizes.indexOf( value ) >= 0
            } ,
            default: SizeDefault ,
        } ,
        //@doc按钮的类型,为[primary ,text]的一种
        type: {
            validator( value ) {
                return value ? true : types.indexOf( value ) >= 0
            } ,
            default: typeDefault ,
        } ,
    } ,
    data() {
        return {
            b: b ,
        }
    } ,
    computed: {
        buttonClassName() {
            let { type , size } = this

            return [
                `${b}-button` ,
                `${b}-button-size${size}` ,
                `${b}-button-${type}` ,
            ]
        } ,
    } ,
    methods: {
        $_onClick( event ) {
            let { loading } = this
            if ( !loading ) {
                //@doc 点击事件，参数event
                this.$emit( `click` , event )
            }
        } ,
    } ,
}
</script>

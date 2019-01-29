<template>
    <button
        :disabled="disabled"
        :class="boxlassName"
        @click.prevent="_onClick"
    >
        <span v-if="showSlot">
            <slot />
        </span>
        <i v-if="loading" />
    </button>
</template>

<script>
const prefixCls = `bview`
const typeDefault = `primary`
const SizeDefault = ``
const types = [
    `main` ,
    `primary` ,
    `dashed` ,
    `text` ,
    `danger` ,
    `ghost` ,
    `dropbox`
]
const sizes = [ `` , `big` , `small` ]

export default {
    name: `BviewButton` ,
    props: {
        //@doc是否禁用按钮
        disabled: {
            type: Boolean ,
            default: false
        } ,
        //@doc是否需要loading
        loading: {
            type: Boolean ,
            default: false
        } ,
        //@doc是否显示slot
        showSlot: {
            type: Boolean ,
            default: true
        } ,
        //@doc按钮的大小
        size: {
            validator( value ) {
                return sizes.indexOf( value ) >= 0
            } ,
            default: SizeDefault
        } ,
        //@doc按钮的类型
        type: {
            validator( value ) {
                return value ? true : types.indexOf( value ) >= 0
            } ,
            default: typeDefault
        }
    } ,
    data() {
        return {}
    } ,
    computed: {
        boxlassName() {
            let { type , size } = this

            return [
                `${prefixCls}-button` ,
                `${prefixCls}-button-size${size}` ,
                `${prefixCls}-button-${type}`
            ]
        }
    } ,
    methods: {
        _onClick( event ) {
            let { loading } = this

            if ( !loading ) {
                //@doc 点击事件，参数event
                this.$emit( `click` , event )
            }
        }
    }
}
</script>

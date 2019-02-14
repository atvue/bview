<template>
    <div
        :class="`${b}-timePicker`"
        @click.stop
    >
        <input
            ref="input"
            :class="`${b}-timePicker-input`"
            :placeholder="placeholder"
            :value="currentValue"
            @focus="$_onFocus"
            @input="$_onInput"
        >
        <i
            v-show="currentValue"
            :class="`${b}-timePicker-input-close`"
            @click="$_del"
        >
            X
        </i>
        <div v-show="show">
            <Time
                ref="ctime"
                :class="`${b}-timePicker-ctime`"
                :time-type="timeType"
                @select="$_selectTime"
            />
        </div>
    </div>
</template>

<script>
import Time from './time'
import { bviewPrefix as b } from '../../utils/macro'

export default {
    name: `TimePicker` ,
    components: {
        Time ,
    } ,
    props: {
        //@doc时间的值（双绑）
        value: {
            type: String ,
            default: `` ,
        } ,
        //@doc时间选择类型，分为时（h）、分(m)、秒(s),支持组合，如hm，代表只要时和分
        timeType: {
            type: String ,
            default: `hms` ,
        } ,
        //@doc时分秒之间的分割符（格式）
        splitCode: {
            type: String ,
            default: `:` ,
        } ,
        //@doc placeholder
        placeholder: {
            type: String ,
            default: `请选择时间` ,
        } ,
    } ,
    data() {
        return {
            b ,
            show: false ,
            currentValue: this.value ,
        }
    } ,
    watch: {
        value( v ) {
            this.currentValue = v
        } ,
    } ,
    mounted() {
        document.body.addEventListener( `click` , () => {
            this.show = false
        } )
    } ,
    methods: {
        $_onFocus() {
            if ( window.preFloatLayer && window.preFloatLayer.show ) {
                window.preFloatLayer.show = false
            }
            this.show = true
            window.preFloatLayer = this
            let s = this.currentValue.split( this.splitCode )
            this.$refs.ctime.setTime( s )
            //@doc 输入框聚焦
            this.$emit( `focus` , this.currentValue )
        } ,
        $_onInput( event ) {
            var v = event.target.value
            this.currentValue = v
            //@doc 输入时间
            this.$emit( `input` , v )
        } ,
        $_del() {
            this.currentValue = ``
            this.$emit( `input` , `` )
            //@doc 删除时间
            this.$emit( `del` )
            this.show = false
        } ,
        $_selectTime( v ) {
            let timeValue = v.join( this.splitCode )
            this.currentValue = timeValue
            this.$emit( `input` , timeValue )
            //@doc 选择时间
            this.$emit( `select` , timeValue )
            //this.dispatch('bFormItem', 'on-form-blur', timeValue)
        } ,
    } ,
}
</script>

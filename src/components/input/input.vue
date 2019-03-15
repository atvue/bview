<template>
    <div
        :class="`${b}-input-wrapper`"
        :style="{ width: width }"
    >
        <span
            v-if="$slots.prepend"
            :class="`${b}-input-icon-prepend`"
        >
            <!-- 输入框前预留位 -->
            <slot name="prepend" />
        </span>
        <Icon
            v-if="type === 'password'"
            :svg="eyeIcon"
            :class="`${b}-input-icon`"
            @click="$_handleOpenEye"
        />
        <Icon
            v-if="clearable && currentValue && !disabled"
            :svg="clearIcon"
            :class="clearIconClasses"
            @click="$_handleClear"
        />
        <Icon
            v-else-if="search"
            :svg="searchIcon"
            :class="[`${b}-input-icon`, `${b}-input-search`]"
            @click="$_handleSearch"
        />
        <input
            ref="input"
            :placeholder="placeholder"
            :class="inputClasses"
            :autocomplete="autocomplete"
            :maxlength="maxlength"
            :value="currentValue"
            :autofocus="autofocus"
            :readonly="readonly"
            :disabled="disabled"
            :type="initType"
            v-bind="nativeProps"
            @click="$_clickInput"
            @input="$_handleInput"
            @focus="$_handleFocus"
            @blur="$_handleBlur"
            @keyup.enter="$_handleEnter"
        >
        <span
            v-if="$slots.append"
            :class="`${b}-input-icon-append`"
        >
            <!-- 输入框后预留位 -->
            <slot name="append" />
        </span>
        <!-- 输入框默认预留位 -->
        <slot />
    </div>
</template>
<script>
import clearIcon from '../../icons/clear'
import searchIcon from '../../icons/search'
import openEyeIcon from '../../icons/openEye'
import closeEyeIcon from '../../icons/closeEye'
import Icon from '../icon'
import { bviewPrefix as b } from '../../utils/macro'
export default {
    name: `Input` ,
    components: {
        Icon ,
    } ,
    props: {
        //@doc输入框类型
        type: {
            type: String ,
            default: `text` ,
        } ,
        //@doc输入框的值
        value: {
            type: [ String , Number ] ,
            default: `` ,
        } ,
        //@doc输入框占位文本
        placeholder: {
            type: String ,
            default: undefined ,
        } ,
        //@doc是否启用自动完成功能，为on或者off
        autocomplete: {
            type: String ,
            default: `off` ,
        } ,
        //@doc是否自动聚焦
        autofocus: {
            type: Boolean ,
            default: false ,
        } ,
        //@doc最大输入长度
        maxlength: {
            type: Number ,
            default: undefined ,
        } ,
        //@doc是否禁用按钮
        disabled: {
            type: Boolean ,
            default: false ,
        } ,
        //@doc是否显示清空按钮
        clearable: {
            type: Boolean ,
            default: false ,
        } ,
        //@doc输入框是否只读
        readonly: {
            type: Boolean ,
            default: false ,
        } ,
        //@doc是否显示搜索按钮
        search: {
            type: Boolean ,
            default: false ,
        } ,
        //@doc输入框长度
        width: {
            type: String ,
            default: `200px` ,
        } ,
        //@doc绑定原生属性
        nativeProps: {
            type: Object ,
            default() {
                return {}
            } ,
        } ,
    } ,
    data() {
        return {
            currentValue: this.value ,
            initType: this.type ,
            clearIcon: clearIcon ,
            searchIcon: searchIcon ,
            openEyeIcon: openEyeIcon ,
            closeEyeIcon: closeEyeIcon ,
            b: b ,
            open: false ,
        }
    } ,

    computed: {
        inputClasses() {
            return [
                `${b}-input` ,
                {
                    [ `${b}-input-disabled` ]: this.disabled ,
                    [ `${b}-input-with-prepend` ]: this.$slots.prepend ,
                    [ `${b}-input-with-append` ]:
                        this.search || this.$slots.append ,
                } ,
            ]
        } ,
        clearIconClasses() {
            return [
                `${b}-input-icon` ,
                {
                    [ `${b}-input-clear-prepend` ]: this.type === `password` ,
                } ,
            ]
        } ,
        eyeIcon() {
            return this.open ? openEyeIcon : closeEyeIcon
        } ,
    } ,
    watch: {
        value( val ) {
            this.$_setCurrentValue( val )
        } ,
    } ,
    methods: {
        $_setCurrentValue( val ) {
            this.currentValue = val
        } ,
        $_handleEnter( event ) {
            if ( this.search && !this.disabled ) {
                //@doc开启 search 时可用，点击搜索或按下回车键时触发
                this.$emit( `search` , event , this.currentValue )
            }
            //@doc enter键时触发
            this.$emit( `enter` , event )
        } ,
        $_clickInput( event ) {
            this.$emit( `click` , event )
        } ,
        $_handleInput( event ) {
            let value = event.target.value
            //@doc 输入框改变时触发
            this.$emit( `input` , value )
            this.$_setCurrentValue( value )
        } ,
        $_handleFocus( event ) {
            //@doc聚焦时触发
            this.$emit( `focus` , event )
        } ,
        $_handleBlur( event ) {
            //@doc失焦时触发
            this.$emit( `blur` , event )
            this.$emit( `on-form-blur` , event )
        } ,
        $_handleClear() {
            this.$emit( `input` , `` )
            this.$_setCurrentValue( `` )
        } ,
        $_handleSearch( event ) {
            this.$emit( `search` , event , this.currentValue )
        } ,
        //@doc手动聚焦
        focus() {
            this.$refs.input.focus()
        } ,
        //@doc手动失焦
        blur() {
            this.$refs.input.blur()
        } ,
        $_handleOpenEye() {
            this.open = !this.open
            this.initType = this.open ? `text` : `password`
        } ,
    } ,
}
</script>

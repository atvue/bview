<template>
    <span
        :class="`${b}-checkbox-wrap`"
        @click="$_change"
    >
        <span :class="checkboxClass">
            <span :class="innerClass" />
            <input
                type="checkbox"
                :class="`${b}-checkbox-input`"
                :disabled="disabled"
                :checked="checked"
                :name="groupName"
                :value="value"
            >
        </span>
        <label :class="`${b}-checkbox-label`">
            <slot />
        </label>
    </span>
</template>

<script>
import { findComponentUpward } from '../../utils/assist'
import { bviewPrefix as b } from '../../utils/macro'

export default {
    name: `Checkbox` ,
    props: {
        //@doc 多选框的值
        value: {
            type: [ String , Number , Boolean ] ,
            default: false ,
        } ,
        //@doc 禁用多选框
        disabled: {
            type: Boolean ,
            default: false ,
        } ,
        //@doc 是否半选状态
        halfChecked: {
            type: Boolean ,
            default: false ,
        } ,
        //@doc 多选按钮的属性name
        name: {
            type: String ,
            default: undefined ,
        } ,
        //@doc 是否选中
        checked: {
            type: Boolean ,
            default: false ,
        } ,
        //@doc 多选按钮的大小
        size: {
            type: String ,
            default: `default` ,
        } ,
    } ,
    data() {
        return {
            b: b ,
            isChecked: !this.isGroup ? this.value : this.checked ,
            groupName: this.name ,
            isGroup: false ,
            parent: undefined ,
        }
    } ,
    computed: {
        checkboxClass: function() {
            return `${b}-checkbox-${this.size}`
        } ,
        innerClass: function() {
            return [
                `${b}-checkbox-inner` ,
                {
                    [ `${b}-checkbox-inner-checked` ]:
                        this.isChecked && !this.disabled && !this.halfChecked ,
                } ,
                {
                    [ `${b}-checkbox-inner-disabled` ]:
                        this.disabled && !this.isChecked ,
                } ,
                {
                    [ `${b}-checkbox-inner-checked-disabled` ]:
                        this.disabled && this.isChecked ,
                } ,
                {
                    [ `${b}-checkbox-inner-half-checked` ]: this.halfChecked ,
                } ,
            ]
        } ,
    } ,
    watch: {
        value( value ) {
            if ( !this.isGroup ) {
                this.isChecked = value
            }
        } ,
    } ,
    mounted() {
        this.parent = findComponentUpward( this , `CheckboxGroup` )
    } ,
    methods: {
        $_change() {
            if ( this.disabled ) {
                return false
            }
            let _isChecked = !this.isChecked
            if ( this.halfChecked ) {
                _isChecked = false
            }

            if ( this.isGroup ) {
                this.parent.$_changeValue( this.value )
            } else {
                //@doc 结合v-model，触发input事件，参数当前值
                this.$emit( `input` , _isChecked )
                //@doc 单个使用时候value改变事件，参数value
                this.$emit( `on-change` , _isChecked )
            }
        } ,
    } ,
}
</script>

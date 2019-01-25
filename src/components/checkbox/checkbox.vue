<template>
    <span
        :class="[prefix + '-checkbox-wrap']"
        @click="_change"
    >
        <span :class="checkboxClass">
            <span :class="innerClass" />
            <input
                type="checkbox"
                :class="[prefix + '-checkbox-input']"
                :disabled="disabled"
                :checked="checked"
                :name="groupName"
                :value="value"
            >
        </span>
        <label :class="[prefix + '-checkbox-label']">
            <slot />
        </label>
    </span>
</template>

<script>
import { findComponentUpward } from '../../utils/assist';

const prefix = `bview`;

export default {
    name: `Checkbox` ,
    props: {
        //@doc 多选框的值
        value: {
            type: [ String , Number , Boolean ] ,
            default: false
        } ,
        //@doc 禁用多选框
        disabled: {
            type: Boolean ,
            default: false
        } ,
        //@doc 是否半选状态
        halfChecked: {
            type: Boolean ,
            default: false
        } ,
        //@doc 多选按钮的属性name
        name: {
            type: String ,
            default: undefined
        } ,
        //@doc 是否选中
        checked: {
            type: Boolean ,
            default: false
        } ,
        //@doc 多选按钮的大小
        size: {
            type: String ,
            default: `default`
        }
    } ,
    data() {
        return {
            prefix: prefix ,
            isChecked: !this.isGroup ? this.value : this.checked ,
            groupName: this.name ,
            isGroup: false ,
            parent: undefined
        };
    } ,
    computed: {
        checkboxClass: function() {
            return `${prefix}-checkbox-${this.size}`;
        } ,
        innerClass: function() {
            return [
                `${prefix}-checkbox-inner` ,
                {
                    [ `${prefix}-checkbox-inner-checked` ]:
                        this.isChecked && !this.disabled && !this.halfChecked
                } ,
                {
                    [ `${prefix}-checkbox-inner-disabled` ]:
                        this.disabled && !this.isChecked
                } ,
                {
                    [ `${prefix}-checkbox-inner-checked-disabled` ]:
                        this.disabled && this.isChecked
                } ,
                {
                    [ `${prefix}-checkbox-inner-half-checked` ]: this.halfChecked
                }
            ];
        }
    } ,
    watch: {
        value( value ) {
            if ( !this.isGroup ) {
                this.isChecked = value;
            }
        }
    } ,
    mounted() {
        this.parent = findComponentUpward( this , `CheckboxGroup` );
    } ,
    methods: {
        _change() {
            if ( this.disabled ) {
                return false;
            }

            if ( this.halfChecked ) {
                this.isChecked = false;
            } else {
                this.isChecked = !this.isChecked;
            }

            if ( this.isGroup ) {
                this.parent._changeValue( this.value );
            } else {
                //@doc 结合v-model，触发input事件，参数当前值
                this.$emit( `input` , this.isChecked );
                //@doc 单个使用时候value改变事件，参数value
                this.$emit( `on-change` , this.isChecked );
            }
        }
    }
};
</script>

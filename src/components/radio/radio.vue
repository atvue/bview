<template>
    <span
        :class="[prefix + '-radio-wrap']"
        @click="_onChange"
    >
        <span :class="radioClass">
            <span :class="innerClass" />
            <input 
                type="radio" 
                :class="[prefix + '-radio-input']"
                :disabled="disabled"
                :checked="checked"
                :name="groupName"
                :value="value"
            >
        </span>
        <label :class="[prefix + '-radio-label']">
            <slot>
                {{ value }}
            </slot>
        </label>
    </span>
</template>

<script>
import { findComponentUpward } from '../../utils/assist'

const prefix = 'bview'

export default {
    name: 'Radio',
    props: {
        //@doc单选按钮的值
        value: {
            type: [String, Number, Boolean],
            default: false
        },
        //@doc是否禁用
        disabled: {
            type: Boolean,
            default: false
        },
        //@doc是否选中
        checked: {
            type: Boolean,
            default: false
        },
        //@doc单选按钮的属性值name
        name: {
            type: String ,
            default: undefined ,
        },
        //@doc单选按钮可选大小
        size: {
            type: String,
            default: 'default'
        }
    },
    data () {
        return {
            prefix: prefix,
            isChecked: !this.isGroup ? this.value : this.checked,
            groupName: this.name,
            isGroup: false,
            parent: undefined,	
        }
    },
    computed: {
        radioClass: function () {
            return `${prefix}-radio-${this.size}`
        },
        innerClass: function () {
            return [
                `${prefix}-radio-inner`,
                {
                    [`${prefix}-radio-inner-checked`]: this.isChecked && !this.disabled
                },
                {
                    [`${prefix}-radio-inner-disabled`]: this.disabled && !this.isChecked
                },
                {
                    [`${prefix}-radio-inner-checked-disabled`]: this.disabled && this.isChecked
                }
            ]
        }
    },
    watch: {
        value (value) {
            if (!this.isGroup) {
                this.isChecked = value
            }
        }
    },
    mounted () {
        this.parent = findComponentUpward(this, 'RadioGroup')
    },
    methods: {
        _onChange () {
            if (this.disabled || this.isChecked) {
                return false;
            }

            this.isChecked = !this.isChecked;

            if(this.isGroup) {
                this.parent._changeValue(this.value)
            }else{
                //@doc 结合v-model，触发input事件，参数当前值
                this.$emit('input', this.isChecked)
                //@doc 单个使用时候value改变事件，参数value
                this.$emit('on-change', this.isChecked)
            }
        },
    }
}
</script>
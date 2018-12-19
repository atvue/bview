<template>
  <div :class="prefixCls+'-wrapper'">
    <textarea ref="textarea" :class="textareaClasses" :style="[{'resize':resize,'width':width,'height':height},textareaStyles]" :placeholder="placeholder" :disabled="disabled" :maxlength="maxlength" :readonly="readonly" :value="currentValue" :autofocus="autofocus" @keyup.enter="_handleEnter" @focus="_handleFocus" @blur="_handleBlur" @input="_handleInput"></textarea>
    <span :class="prefixCls+'-count'" v-if="maxlength">{{current + '/' + maxlength}}</span>
  </div>
</template>

<script>
import calcTextareaHeight from '../../utils/calcTextareaHeight';
const prefixCls = 'bui-textarea';
export default {
    name: 'Textarea',
    props: {
        //@doc绑定的值
        value: {
            type: [String, Number],
            default: ''
        },
        //@doc输入框占位文本
        placeholder: {
            type: String,
            default: '提示性文案'
        },
        //@doc自带属性
        autocomplete: {
            type: String,
            default: 'off'
        },
        //@doc是否自动聚焦
        autofocus: {
            type: Boolean,
            default: false
        },
        //@doc最大输入长度
        maxlength: {
            type: Number
        },
        //@doc是否禁用状态
        disabled: {
            type: Boolean,
            default: false
        },
        //@doc是否只读
        readonly: {
            type: Boolean,
            default: false
        },
        //@doc调整textarea的方向，可选择both、vertical、horizontal
        resize: {
            type: String,
            default: 'none'
        },
        //@doc是否自动调整textarea
        autoResize: {
            type: Boolean,
            default: false
        },
        //@doc 宽度
        width: {
            type: String,
            default: '450px'
        },
        //@doc 高度 
        height: {
            type: String,
            default: '50px'
        }
    },
    data() {
        return {
            currentValue: this.value,
            prefixCls: prefixCls,
            textareaStyles: ''
        };
    },
    computed: {
        textareaClasses() {
            return [
                `${prefixCls}`,
                {
                    [`${prefixCls}-disabled`]: this.disabled
                }
            ];
        },
        current() {
            return this.value.length;
        }
    },
    mounted() {
        this._resizeTextarea();
    },
    methods: {
        _setCurrentValue(val) {
            this.currentValue = val;
            this.$nextTick(() => {
                this._resizeTextarea();
            });
        },
        _handleEnter(event) {
            //@doc enter键触发
            this.$emit('enter', event);
        },
        _handleInput(event) {
            let value = event.target.value;
            //@doc输入框改变时触发
            this.$emit('input', value);
            this._setCurrentValue(value);
        },
        //@doc 手动聚焦输入框
        focus() {
            this.$refs.input.focus();
        },
        //@doc 手动失焦输入框
        blur() {
            this.$refs.input.blur();
        },
        _handleFocus(event) {
            //@doc 聚焦时触发
            this.$emit('focus', event);
        },
        _handleBlur(event) {
            //@doc 失焦时触发
            this.$emit('blur', event);
        },
        _resizeTextarea() {
            const autoResize = this.autoResize;
            if (!autoResize) {
                return false;
            }
            this.textareaStyles = calcTextareaHeight(this.$refs.textarea);
        }
    }
};
</script>


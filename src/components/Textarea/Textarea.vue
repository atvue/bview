<template>
  <div :class="prefixCls+'-wrapper'">
    <textarea ref="textarea" :class="textareaClasses" :style="[{'resize':resize,'width':width,'height':height},textareaStyles]" :placeholder="placeholder" :disabled="disabled" :maxlength="maxlength" :readonly="readonly" :name="name" :value="currentValue" :autofocus="autofocus" @keyup.enter="handleEnter" @focus="handleFocus" @blur="handleBlur" @input="handleInput"></textarea>
    <span :class="prefixCls+'-count'" v-if="maxlength">{{current + '/' + maxlength}}</span>
  </div>
</template>

<script>
import calcTextareaHeight from '../../utils/calcTextareaHeight';
const prefixCls = 'bui-textarea';
export default {
    name: 'Textarea',
    props: {
        value: {
            type: [String, Number],
            default: ''
        },
        name: {
            type: String
        },
        placeholder: {
            type: String,
            default: '提示性文案'
        },
        autocomplete: {
            type: String,
            default: 'off'
        },
        autofocus: {
            type: Boolean,
            default: false
        },
        maxlength: {
            type: Number
        },
        disabled: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        },
        resize: {
            type: String,
            default: 'none'
        },
        autoResize: {
            type: Boolean,
            default: false
        },
        width: {
            type: String,
            default: '450px'
        },
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
        this.resizeTextarea();
    },
    methods: {
        setCurrentValue(val) {
            this.currentValue = val;
            this.$nextTick(() => {
                this.resizeTextarea();
            });
        },
        handleEnter(event) {
            this.$emit('enter', event);
        },
        handleInput(event) {
            let value = event.target.value;
            this.$emit('input', value);
            this.setCurrentValue(value);
        },
        focus() {
            this.$refs.input.focus();
        },
        blur() {
            this.$refs.input.blur();
        },
        handleFocus(event) {
            this.$emit('focus', event);
        },
        handleBlur(event) {
            this.$emit('blur', event);
        },
        resizeTextarea() {
            const autoResize = this.autoResize;
            if (!autoResize) {
                return false;
            }
            this.textareaStyles = calcTextareaHeight(this.$refs.textarea);
        }
    }
};
</script>


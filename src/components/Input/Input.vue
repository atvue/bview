<template >
    <div :class="prefixCls+'-wrapper'" :style="{'width':width}">
        <span :class="[prefixCls + '-icon-prepend']" v-if="$slots.prepend||prependIcon">
            <slot name="prepend"></slot>
            <i :class="['iconfont',prependIcon]" v-if="prependIcon"></i>
        </span>
        <i v-if="clearable&&currentValue&&!disabled" :class="['iconfont icon-shibai',prefixCls+'-icon',prefixCls+'-icon-clear']" style="font-size:12px;" @click="handleClear"></i>
        <i v-else-if="search" :class="['iconfont icon-sousuokuang-sousuo',prefixCls+'-icon',prefixCls+'-icon-search']" @click="handleSearch"></i>
        <input ref="input" :placeholder="placeholder" :class="inputClasses" :name="name" :autocomplete="autocomplete" :maxlength="maxlength" :value="currentValue" @input="handleInput" :autofocus="autofocus" @focus="handleFocus" @blur="handleBlur" :readonly="readonly" :disabled="disabled" :type="type" @keyup.enter="handleEnter">
        <span :class="[prefixCls + '-icon-append']" v-if="$slots.append||appendIcon">
            <slot name="append"></slot>
            <i :class="['iconfont',appendIcon]" v-if="appendIcon"></i>
        </span>
        <slot></slot>
    </div>

</template>
<script>
const prefixCls = 'bui-input';
export default {
    name: 'Input',
    props: {
        type: {
            type: String,
            default: 'text'
        },
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
        clearable: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        },
        search: {
            type: Boolean,
            default: false
        },
        prependIcon: String,
        appendIcon: String,
        width: {
            type: String,
            default: '200px'
        }
    },
    data() {
        return {
            currentValue: this.value,
            prefixCls: prefixCls
        };
    },
    computed: {
        inputClasses() {
            return [
                `${prefixCls}`,
                {
                    [`${prefixCls}-disabled`]: this.disabled,
                    [`${prefixCls}-with-prepend`]:
                        this.$slots.prepend || this.prependIcon,
                    [`${prefixCls}-with-append`]:
                        this.appendIcon || this.search || this.$slots.append
                }
            ];
        }
    },
    methods: {
        setCurrentValue(val) {
            this.currentValue = val;
        },
        handleEnter(event) {
            if (this.search && !this.disabled) {
                this.$emit('search', event, this.currentValue);
            }
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
        handleClear() {
            const e = { target: { value: '' } };
            this.$emit('input', '');
            this.setCurrentValue('');
        },
        handleSearch(event) {
            this.$emit('search', event, this.currentValue);
        }
    },
    watch: {
        value(val) {
            this.setCurrentValue(val);
        }
    }
};
</script>



<template >
    <div :class="prefixCls+'-wrapper'" :style="{'width':width}">
        <span :class="[prefixCls + '-icon-prepend']" v-if="$slots.prepend||prependIcon">
            <!-- 输入框内部：左侧（前）预留位 -->
            <slot name="prepend"></slot>
            <i :class="['iconfont',prependIcon]" v-if="prependIcon"></i>
        </span>
        <i v-if="clearable&&currentValue&&!disabled" :class="['iconfont icon-shibai',prefixCls+'-icon',prefixCls+'-icon-clear']" style="font-size:12px;" @click="_handleClear"></i>
        <i v-else-if="search" :class="['iconfont icon-sousuokuang-sousuo',prefixCls+'-icon',prefixCls+'-icon-search']" @click="_handleSearch"></i>
        <input ref="input" :placeholder="placeholder" :class="inputClasses" :autocomplete="autocomplete" :maxlength="maxlength" :value="currentValue" @input="_handleInput" :autofocus="autofocus" @focus="_handleFocus" @blur="_handleBlur" :readonly="readonly" :disabled="disabled" :type="type" @keyup.enter="_handleEnter">
        <span :class="[prefixCls + '-icon-append']" v-if="$slots.append||appendIcon">
            <!-- 输入框：右侧（后）预留位 -->
            <slot name="append"></slot>
            <i :class="['iconfont',appendIcon]" v-if="appendIcon"></i>
        </span>
        <!-- 默认插槽，输入框外部后方 -->
        <slot></slot>
    </div>

</template>
<script>
const prefixCls = 'bview-input';
export default {
    name: 'Input',
    props: {
        //@doc输入框类型
        type: {
            type: String,
            default: 'text'
        },
        //@doc输入框的值
        value: {
            type: [String, Number],
            default: ''
        },
        //@doc输入框占位文本
        placeholder: {
            type: String,
            default: '提示性文案'
        },
        //@doc是否启用自动完成功能，为on或者off
        autocomplete: {
            type: String,
            default: 'on'
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
        //@doc是否禁用按钮
        disabled: {
            type: Boolean,
            default: false
        },
        //@doc是否显示清空按钮
        clearable: {
            type: Boolean,
            default: false
        },
        //@doc输入框是否只读
        readonly: {
            type: Boolean,
            default: false
        },
        //@doc是否显示搜索按钮
        search: {
            type: Boolean,
            default: false
        },
        //@doc输入框头部icon
        prependIcon: String,
        //@doc输入框尾部icon
        appendIcon: String,
        //@doc输入框长度
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
        _setCurrentValue(val) {
            this.currentValue = val;
        },
        _handleEnter(event) {
            if (this.search && !this.disabled) {
                //@doc开启 search 时可用，点击搜索或按下回车键时触发
                this.$emit('search', event, this.currentValue);
            }
            //@doc enter键时触发
            this.$emit('enter', event);
        },
        _handleInput(event) {
            let value = event.target.value;
            //@doc 输入框改变时触发
            this.$emit('input', value);
            this._setCurrentValue(value);
        },
        _handleFocus(event) {
            //@doc聚焦时触发
            this.$emit('focus', event);
        },
        _handleBlur(event) {
            //@doc失焦时触发
            this.$emit('blur', event);
        },
        _handleClear() {
            const e = { target: { value: '' } };
            this.$emit('input', '');
            this._setCurrentValue('');
        },
        _handleSearch(event) {
            this.$emit('search', event, this.currentValue);
        },
        //@doc手动聚焦
        focus() {
            this.$refs.input.focus();
        },
        //@doc手动失焦
        blur() {
            this.$refs.input.blur();
        },
    },
    watch: {
        value(val) {
            this._setCurrentValue(val);
        }
    }
};
</script>



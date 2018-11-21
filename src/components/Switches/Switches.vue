<template>
  <span :class="wrapClasses" @click="toggle" @keydown.space="toggle" ref="switch">
    <i :class="[prefixCls+'-loading',{'iconfont icon-loading':loading}]"></i>
    <input type="hidden" :name="name" :value="currentValue">
    <span :class="prefixCls+'-inner'">
      <span v-if="trueText&&currentValue">{{trueText}}</span>
      <span v-if="falseText&&currentValue">{{falseText}}</span>
      <slot name="open" v-if="currentValue"></slot>
      <slot name="close" v-if="!currentValue"></slot>
    </span>
  </span>
</template>
<script>
const prefixCls = 'bui-switches';
export default {
    name: 'Switches',
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        value: {
            type: Boolean,
            default: false
        },
        icon: {
            type: String
        },
        loading: {
            type: Boolean,
            default: false
        },
        trueText: String,
        falseText: String,
        name: String
    },
    data() {
        return {
            prefixCls: prefixCls,
            currentValue: this.value
        };
    },
    methods: {
        toggle(e) {
            event.preventDefault();
            if (this.disabled || this.loading) {
                return false;
            }
            let checked = !this.currentValue;
            this.currentValue = checked;
            this.$emit('input', checked);
        }
    },
    computed: {
        wrapClasses() {
            return [
                `${prefixCls}`,
                {
                    [`${prefixCls}-checked`]: this.currentValue,
                    [`${prefixCls}-disabled`]: this.disabled,
                    // [`${prefixCls}-loading`]: this.loading
                }
            ];
        }
    }
};
</script>



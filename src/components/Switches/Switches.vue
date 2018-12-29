<template>
    <span 
        ref="switch"
        :class="wrapClasses" 
        @click="_toggle" 
        @keydown.space="_toggle" 
    >
        <i :class="[prefixCls+'-loading',{'iconfont icon-loading':loading}]" />
        <input 
            type="hidden" 
            :name="name" 
            :value="currentValue"
        >
        <span :class="prefixCls+'-inner'">
            <span v-if="trueText&&currentValue">
                {{ trueText }}
            </span>
            <span v-if="falseText&&currentValue">
                {{ falseText }}
            </span>
            <slot 
                v-if="currentValue"
                name="open" 
            />
            <slot 
                v-if="!currentValue"
                name="close"
            />
        </span>
    </span>
</template>
<script>
const prefixCls = 'bui-switches';
export default {
    name: 'Switches',
    props: {
        //@doc开关禁用
        disabled: {
            type: Boolean,
            default: false
        },
        //@doc开关的值
        value: {
            type: Boolean,
            default: false
        },
        //@doc 是否显示正在加载
        loading: {
            type: Boolean,
            default: false
        },
        //@doc value为true时显示的值
        trueText: {
            type: String ,
            default: undefined ,
        },
        //@doc value为false时显示的值
        falseText: {
            type: String ,
            default: undefined ,
        },
        //@doc开关的name属性
        name: {
            type: String ,
            default: undefined ,
        }
    },
    data() {
        return {
            prefixCls: prefixCls,
            currentValue: this.value
        };
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
    },
    methods: {
        _toggle() {
            event.preventDefault();
            if (this.disabled || this.loading) {
                return false;
            }
            let checked = !this.currentValue;
            this.currentValue = checked;
            //@doc开关切换时触发
            this.$emit('input', checked);
        }
    }
};
</script>



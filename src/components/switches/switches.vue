<template>
    <span
        ref="switch"
        :class="wrapClasses"
        @click="$_toggle"
        @keydown.space="$_toggle"
    >
        <Icon
            v-if="loading"
            :svg="loadIcon"
            :class="`${b}-switch-loading`"
        />
        <input
            type="hidden"
            :name="name"
            :value="currentValue"
        >
        <span :class="`${b}-switch-inner`">
            <span v-if="trueText && currentValue">
                {{ trueText }}
            </span>
            <span v-if="falseText && !currentValue">
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
import Icon from '../icon'
import { bviewPrefix as b } from '../../utils/macro'
import loadIcon from '../../icons/loading'
export default {
    name: `Switches` ,
    components: { Icon } ,
    props: {
        //@doc开关禁用
        disabled: {
            type: Boolean ,
            default: false
        } ,
        //@doc开关的值
        value: {
            type: Boolean ,
            default: false
        } ,
        //@doc 是否显示正在加载
        loading: {
            type: Boolean ,
            default: false
        } ,
        //@doc value为true时显示的值
        trueText: {
            type: String ,
            default: undefined
        } ,
        //@doc value为false时显示的值
        falseText: {
            type: String ,
            default: undefined
        } ,
        //@doc开关的name属性
        name: {
            type: String ,
            default: undefined
        }
    } ,
    data() {
        return {
            currentValue: this.value ,
            loadIcon: loadIcon ,
            b
        }
    } ,
    computed: {
        wrapClasses() {
            return [
                `${b}-switch` ,
                {
                    [ `${b}-switch-checked` ]: this.currentValue ,
                    [ `${b}-switch-disabled` ]: this.disabled
                    // [`${prefixCls}-loading`]: this.loading
                }
            ]
        }
    } ,
    methods: {
        $_toggle() {
            event.preventDefault()
            if ( this.disabled || this.loading ) {
                return false
            }
            let checked = !this.currentValue
            this.currentValue = checked
            //@doc开关切换时触发
            this.$emit( `input` , checked )
        }
    }
}
</script>

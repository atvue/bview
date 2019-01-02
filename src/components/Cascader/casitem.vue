<template>
    <li :class="classes">
        {{ data.label }}
        <i
            v-if="showArrow"
            class="ivu-icon ivu-icon-ios-arrow-forward"
        />
        <i
            v-if="showLoading"
            class="ivu-icon ivu-icon-ios-loading ivu-load-loop"
        />
    </li>
</template>
<script>
export default {
    name: 'Casitem',
    props: {
        data: {
            type:Object,
            default:()=>{
                return {}
            }
        },
        prefixCls: {
            type:String,
            default:'',
        },
        tmpItem: {
            type:Object,
            default:()=>{
                return {}
            }
        },
    },
    computed: {
        classes () {
            return [
                `${this.prefixCls}-menu-item`,
                {
                    [`${this.prefixCls}-menu-item-active`]: this.tmpItem.value === this.data.value,
                    [`${this.prefixCls}-menu-item-disabled`]: this.data.disabled
                }
            ];
        },
        showArrow () {
            return (this.data.children && this.data.children.length) || ('loading' in this.data && !this.data.loading);
        },
        showLoading () {
            return 'loading' in this.data && this.data.loading;
        }
    }
};
</script>
<template>
    <li :class="classes">
        {{ data.label }}
        <Icon 
            v-if="showArrow"
            class="child-icon"
            :svg="hasChild"
            :size="14"
        />
        <Icon 
            v-if="showLoading"
            class="child-icon"
            :svg="loading"
            :size="14"
        />
    </li>
</template>
<script>
import Icon from '../icon'
import hasChild from "../../icons/right_arrow"
import loading from "../../icons/loading"

export default {
    name: 'Casitem',
    components: {
        Icon ,
    } ,
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
    data(){
        return {
            hasChild ,
            loading ,
        }
    } ,
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
        },
    }
};
</script>
<style type="less">
    .child-icon{position: absolute;top: 4px;right:6px;}
</style>
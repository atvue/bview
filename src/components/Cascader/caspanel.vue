<template>
    <span>
        <ul
            v-if="data && data.length"
            :class="[prefixCls + '-menu']"
        >
            <Casitem
                v-for="item in data"
                :key="getKey(item)"
                :prefix-cls="prefixCls"
                :data="item"
                :tmp-item="tmpItem"
                @click.native="handleClickItem(item)"
                @mouseenter.native="handleHoverItem(item)"
            />
        </ul>
        <Caspanel 
            v-if="sublist && sublist.length" 
            :prefix-cls="prefixCls" 
            :data="sublist" 
            :disabled="disabled" 
            :change-on-select="changeOnSelect"
            :trigger="trigger"
        />
    </span>
</template>
<script>
import Casitem from './casitem.vue';
import Emitter from '../../utils/emitter';
import { findComponentUpward, findComponentDownward } from '../../utils/assist';
let key = 1;
export default {
    name: 'Caspanel',
    components: { Casitem },
    mixins: [ Emitter ],
    props: {
        data: {
            type: Array,
            default () {
                return [];
            }
        },
        disabled: Boolean,
        changeOnSelect: Boolean,
        trigger: {
            type:String,
            default:'',
        },
        prefixCls: {
            type:String,
            default:'',
        }
    },
    data () {
        return {
            tmpItem: {},
            result: [],
            sublist: [],
        };
    },
    watch: {
        data () {
            this.sublist = [];
        }
    },
    mounted () {
        this.$on('on-find-selected', (params) => {
            const val = params.value;
            let value = [...val];
            value.forEach( item => {
                this.data.forEach( ele => {
                    if (item === ele.value) {
                        this.handleTriggerItem(ele , true);
                        value.splice(0, 1);
                        this.$nextTick(() => {
                            this.broadcast('Caspanel', 'on-find-selected', {
                                value: value
                            });
                        });
                        return false;
                    }
                })
            })
        });
        this.$on('on-clear', (deep = false) => {
            this.sublist = [];
            this.tmpItem = {};
            if (deep) {
                const Caspanel = findComponentDownward(this, 'Caspanel');
                if (Caspanel) {
                    Caspanel.$emit('on-clear', true);
                }
            }
        });
    },
    methods: {
        handleClickItem (item) {
            if (this.trigger !== 'click' && item.children && item.children.length) return;  
            this.handleTriggerItem(item, false, true);
        },
        handleHoverItem (item) {
            if (this.trigger !== 'hover' || !item.children || !item.children.length) return;  
            this.handleTriggerItem(item, false, true);
        },
        handleTriggerItem (item, fromInit = false, fromUser = false) {
            if (item.disabled) return;
            const cascader = findComponentUpward(this, 'Cascader');
            if (cascader) {
                cascader.noChild = false ;
            }
            // 异步获取子节点列表
            if (item.loading !== undefined && !item.children.length) {
                if (cascader && cascader.loadData) {
                    cascader.loadData(item, () => {
                        // 用户定义事件执行
                        if (fromUser) {
                            cascader.isLoadedChildren = true;
                        }
                        // 若子节点仍有子节点，进行递归
                        if (item.children.length) {
                            this.handleTriggerItem(item);
                        } else {
                            // 子节点数量为 0 ，选中当前节点并提示无子节点 ，
                            cascader.noChild = true ;
                            this.sublist = [] ;
                            if (this.changeOnSelect) {
                                const backItem = this.getBaseItem(item);
                                if (backItem.label !== this.tmpItem.label || backItem.value !== this.tmpItem.value) {
                                    this.tmpItem = backItem;
                                    this.emitUpdate([backItem]);
                                }
                            }
                        }
                    });
                    return;
                }
            }
            // 向上递归，设置选中值
            const backItem = this.getBaseItem(item);
            if (backItem.label !== this.tmpItem.label || backItem.value !== this.tmpItem.value) {
                this.tmpItem = backItem;
                this.emitUpdate([backItem]);
            }
            if (item.children && item.children.length){
                this.sublist = item.children;
                this.dispatch('Cascader', 'on-result-change', {
                    lastValue: false,
                    changeOnSelect: this.changeOnSelect,
                    fromInit: fromInit
                });
                if (this.changeOnSelect) {
                    const Caspanel = findComponentDownward(this, 'Caspanel');
                    if (Caspanel) {
                        Caspanel.$emit('on-clear', true);
                    }
                }
            } else {
                this.sublist = [];
                this.dispatch('Cascader', 'on-result-change', {
                    lastValue: true,
                    changeOnSelect: this.changeOnSelect,
                    fromInit: fromInit
                });
            }
        },
        updateResult (item) {
            this.result = [this.tmpItem].concat(item);
            this.emitUpdate(this.result);
        },
        getBaseItem (item) {
            let backItem = Object.assign({}, item);
            if (backItem.children) {
                delete backItem.children;
            }
            return backItem;
        },
        emitUpdate (result) {
            this.$parent.updateResult && this.$parent.updateResult(result);
        },
        getKey () {
            return key++;
        }
    }
};
</script>
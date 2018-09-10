// 重构后的select
// 新增功能：
// remote远程数据源
// 多选
<template>
    <div class="nop-selectn" :class="nopclasses" ref="selectWrapper">
        <div @click="toggleDropdown( !visible )" class="nop-selectn-selection">
            <!-- 输入模式 -->
            <!-- <div> -->
            <!-- 最左侧图标，filterable !multiple时显示 -->
            <Icon class="nop-selectn-icon" type="sousuokuang-sousuo" size="12" v-if="filterable&&!multiple"></Icon>
            <!-- END 最左侧图标，filterable时显示 -->
            <!-- placeholder, !filterable -->
            <span v-if="!filterable" v-show="!valueLabel" class="nop-selectn-placeholder">{{placeholder?placeholder:defaultPlaceholder}}</span>
            <!-- END placeholder, !filterable  -->
            <!-- 显示当前选中 -->
            <!-- 非多选 -->
            <span v-if="!(filterable||multiple)" v-show="valueLabel" class="nop-selectn-value-label">{{valueLabel}}</span>
            <!-- 多选 -->
            <span v-if="multiple&&valueLabelMul.length>0" class="nop-selectn-mullabel">
                <span v-for="item in valueLabelMul" class="nop-selectn-multag">{{item.label}}
                    <Icon type="close" @click.stop="onMulCancel(item)"></Icon>
                </span>
            </span>
            <!-- END 显示当前选中 -->
            <!-- 筛选输入框:  非多选-->
            <input ref="input" v-if="filterable&&!multiple" class="nop-selectn-input" :placeholder="placeholder?placeholder:defaultPlaceholder" :disabled="disabled" type="text" v-model="query" :maxlength="maxFilterLength" @blur="onBlur" @input="onInput" @focus="inputing=true" autocomplete="off" spellcheck="false" />
            <!-- END 筛选输入框:  非多选 -->
            <!-- </div> -->
            <!-- END 输入模式 -->
            <i class="nop-arrow-down-b"></i>
        </div>
        <!-- 下拉选框 -->
        <div v-show="visible" class="nop-selectn-dropdown-list" @mousewheel="onScroll">
            <!-- 筛选输入框: 多选 -->
            <input ref="input" v-if="filterable&&multiple" class="nop-selectn-input" :placeholder="'输入关键词筛选'" :disabled="disabled" type="text" v-model="query" :maxlength="maxFilterLength" @blur="onBlur" @input="onInput" autocomplete="off" spellcheck="false" />
            <!-- END 筛选输入框: 多选 -->
            <ul v-show="visibleCount>0" class="" ref="dropdown" @mouseover="hoverList=true" @mouseout="hoverList=false">
                <slot>
                </slot>
            </ul>
            <div v-show="!loading&&visibleCount==0" class="nop-selectn-none">
                <slot name="empty">{{emptyTip}}</slot>
            </div>
        </div>
        <!-- END 下拉选框 -->
    </div>
</template>

<script>
import Emitter from '@/mixins/emitter';
import Icon from '@/components/icon';
import { debounce } from '@/utils/throttleDebounce';

export default {
    name: 'nop-select',
    components: {
        Icon
    },
    mixins: [Emitter],
    props: {
        placeholder: {
            type: String
        },
        value: {
            type: [Number, String, Array]
        },
        disabled: {
            type: Boolean,
            default: false
        },
        multiple: {
            type: Boolean,
            default: false
        },
        filterable: {
            type: Boolean,
            default: false
        },
        remote: {
            type: Boolean,
            default: false
        },
        maxFilterLength: {
            type: Number,
            default: 50
        },
        remoteMethod: {
            type: Function
        },
        debounce: {
            type: Number,
            default: undefined
        },
        loading: {
            type: Boolean,
            default: false
        },
        emptyTip: {
            type: String,
            default: '无匹配数据'
        }
    },
    created() {
        let { remoteMethod } = this;
        if (remoteMethod !== undefined) {
            let { debounce: time } = this;
            if (time !== undefined) {
                this.remoteMethodDebounce = debounce(time, remoteMethod);
            } else {
                this.remoteMethodDebounce = remoteMethod;
            }
        }
    },
    data() {
        return {
            currentValue: this.value, // 实际选中值
            defaultPlaceholder: '请选择',
            visible: false,
            optionInstances: [],
            options: [],
            query: '', // 输入的筛选字段
            initVal: '', // 初始值
            selectChangeQuery: false, // 标记是否选中option导致query变更
            hoverList: false, // 标记鼠标是否在下拉列表上
            inputing: false
        };
    },
    computed: {
        // 计算依赖this.options 当异步获取的选项添加时会引起重新计算
        //
        valueLabel() {
            if (this.multiple) {
                return undefined;
            }
            let { currentValue, options } = this,
                target = options.find(({ value: tmpValue }) => {
                    // @NOTE 应该用全等符号判断
                    return tmpValue === currentValue;
                });

            let label = target !== undefined ? target.label : undefined;

            return label;
        },
        valueLabelMul() {
            if (!this.multiple) {
                return [];
            }
            let { currentValue, options } = this;
            // console.log(options)
            return (
                currentValue.map(value =>
                    options.find(({ value: tmpValue }) => tmpValue === value)
                ) || []
            );
        },
        nopclasses() {
            return {
                'nop-selectn-visible': this.visible,
                'nop-selectn-disabled': this.disabled
            };
        },
        // 获取当前可视option节点数量
        visibleCount() {
            return this.optionInstances.filter(child => {
                return !child.hidden;
            }).length;
        }
    },
    watch: {
        visible: function(val, oldVal) {
            if (val) {
                document.addEventListener('click', this.documentClick);
            } else {
                this.unbindGlobalEvents();
            }
        },
        value: function(val, oldVal) {
            this.currentValue = val;
            this.updateSelected(val);
        },
        // filterable模式下 输入框query变更引起筛选
        query(val) {
            // 不是主动选中导致query变更
            if (!this.selectChangeQuery) {
                if (this.remote) {
                    // remote
                    this.remoteMethodDebounce(val || '');
                    this.clearSelect();
                } else if (val !== undefined) {
                    // 非remote
                    this.broadcast('nop-select-option', 'select-filter', val);
                }
            }
            this.selectChangeQuery = false;
        },
        // @NOTE 之后要区分多选和非多选的情况
        valueLabel(val) {
            // debugger;
            // 选中时变更输入框值
            // @NOTE val为undefined时如果不更新query为空字符串，将出现无法清空的情况
            // @NOTE remote时，重新输入列表变化会导致valueLabel重新计算可能为undefined 此时变化query有问题
            // @NOTE 新增 根据是否正在输入判断是否清空query
            if (this.remote) {
                !this.inputing &&
                    this.filterable &&
                    (this.query = val) &&
                    (this.selectChangeQuery = true);
            } else {
                this.filterable &&
                    (this.query = val) &&
                    (this.selectChangeQuery = true);
            }
        }
    },
    methods: {
        toggleDropdown(val) {
            if (val && !this.disabled) {
                let hasChild =
                    this.$slots.default && this.$slots.default.length > 0;
                this.visible = true;

                if (hasChild) {
                    // this.query = "";
                    // 设置scroll状态，滚动到选中项可见位置
                    this.$nextTick(() => {
                        let flag = false;
                        this.findChild(child => {
                            if (
                                child.selected === true &&
                                child.index > 1 &&
                                !flag
                            ) {
                                this.resetScrollTop(child.index);
                                flag = true;
                                // child.$el.scrollIntoView();
                            }
                        });
                    });
                }
            } else {
                this.hideMenu();
            }
        },
        hideMenu(select = false) {
            this.visible = false;
            // 输入框失焦
            this.filterable && this.$refs.input.blur();
            // 多选情况下清空query
            this.multiple && (this.query = '');
            this.broadcast('nop-select-option', 'select-close');
            this.$emit('close', select);
        },
        // 下拉框滚动条状态
        // 如果有传入index 直接设置到index
        resetScrollTop(_index) {
            const index = _index - 1 || this.focusIndex - 1,
                optionInstanceRect = this.optionInstances[
                    index
                ].$el.getBoundingClientRect(),
                dropdown = this.$refs.dropdown,
                dropdownRect = dropdown.getBoundingClientRect();
            let bottomOverflowDistance =
                optionInstanceRect.bottom - dropdownRect.bottom;
            let topOverflowDistance = optionInstanceRect.top - dropdownRect.top;
            if (bottomOverflowDistance > 0) {
                dropdown.scrollTop += bottomOverflowDistance;
            }
            if (topOverflowDistance < 0) {
                dropdown.scrollTop += topOverflowDistance;
            }
        },
        documentClick(event) {
            let { target } = event,
                { selectWrapper } = this.$refs;
            if (!selectWrapper.contains(target)) {
                this.hideMenu();
            }
        },
        updateSelected(val) {
            this.optionInstances.forEach(child => {
                child.selected = this.multiple
                    ? this.currentValue.indexOf(child.value) !== -1
                    : child.value === this.currentValue;
            });
        },
        // find option component
        findChild(cb) {
            const find = function(child) {
                const name = child.$options.name;
                if (name === 'nop-select-option') {
                    cb(child);
                } else if (child.$children.length) {
                    child.$children.forEach(innerChild => {
                        find(innerChild, cb);
                    });
                }
            };
            if (this.optionInstances.length) {
                this.optionInstances.forEach(child => {
                    find(child);
                });
            } else {
                this.$children.forEach(child => {
                    find(child);
                });
            }
        },
        updateOptions(slot = false) {
            let options = [];
            let index = 1;
            this.findChild(child => {
                options.push({
                    value: child.value,
                    label:
                        child.label === undefined
                            ? child.$el.textContent
                            : child.label
                });
                child.index = index++;
                // @TODO childselect状态判断待优化

                child.selected = this.multiple
                    ? this.currentValue.indexOf(child.value) !== -1
                    : child.value === this.currentValue;

                this.optionInstances.push(child);
            });
            this.options = options;
        },
        unbindGlobalEvents() {
            document.removeEventListener('click', this.documentClick);
        },
        onInput() {
            this.inputing = true;
            this.$emit('onInput', this.query);
        },
        onBlur() {
            this.inputing = false;
            // 多选，则直接退出？
            if (this.multiple) {
                return;
            }
            // 点击列表引起blur 不处理
            if (this.hoverList) {
                return;
            }
            // 可见项目为1 且未选中
            if (
                this.query !== '' &&
                this.visibleCount === 1 &&
                !this.valueLabel &&
                !this.remote
            ) {
                // 查找可见项并选中
                this.broadcast('nop-select-option', 'select-visible');
                return;
            }
            // query为空，且点击其他地区失焦
            if (this.query === '') {
                this.clearSelect();
                return;
            }
            // query不为空 有选中项目且点击其他区域失焦
            if (this.valueLabel) {
                // query设置为原选中项目
                this.query = this.valueLabel;
                return;
            }
            // 无选中项目且点击其他区域失焦 且query不为空
            if (!this.valueLabel && this.query !== '') {
                // 清空query
                this.query = '';
            }
            this.$emit('blur', this.value);
        },
        // 清空当前选项
        clearSelect() {
            this.$emit('input', '');
        },
        clearAll() {
            this.$emit('input', '');
        },
        // 选择某一项 根据value
        // @NOTE multiple暂不能使用这个功能
        setSelect(val) {
            this.findChild(child => {
                if (child.value === val) {
                    child.select();
                }
            });
        },
        // 获取当前选项
        // @NOTE multiple暂不能使用这个功能
        getSelect() {
            let { value } = this,
                hasControlled = this.$options.propsData.hasOwnProperty('value');
            if (!hasControlled) {
                return this.currentValue;
            } else {
                return this.value;
            }
        },
        // select内滚动到顶部或者底部 父层不滚动
        onScroll(event) {
            let scrollHeight = event.currentTarget.scrollHeight,
                scrollTop = event.currentTarget.scrollTop,
                height = event.currentTarget.clientHeight;

            let delta = event.wheelDelta
                ? event.wheelDelta
                : -(event.detail || 0);
            if (
                (delta > 0 && scrollTop <= delta) ||
                (delta < 0 && scrollHeight - height - scrollTop <= -1 * delta)
            ) {
                // @NOTE 设置scrollTop到底部或顶部，根据滚动方向
                event.currentTarget.scrollTop = delta > 0 ? 0 : scrollHeight;
                event.preventDefault();
            }
        },
        // 多选情况下 取消选中
        onMulCancel(target) {
            let tarIndex = this.currentValue.findIndex(value => {
                return value === target.value;
            });
            this.currentValue.splice(tarIndex, 1);
            this.$emit('input', this.currentValue);
        }
    },
    mounted() {
        // @NOTE 首次需要主动查找子节点
        this.updateOptions();
        // @NOTE 初始化
        if (this.value !== 'undefined') {
            // @NOTE 应该不需要
            // (this.filterable)&&(this.query=this.value)&&(this.selectChangeQuery=true);

            // !this.filterable&&this.setSelect(this.value)
            this.initVal = this.value;
        }
        // 远程的，先获取一次列表
        if (this.remote && this.optionInstances.length === 0) {
            this.remoteMethodDebounce('');
        }
        // options点击事件
        this.$on('selected', data => {
            // 区分是否变化
            // 同一个选项点击
            if (this.currentValue === data) {
                // @NOTE 重置query值
                this.query = this.valueLabel;
                this.hideMenu(true);
                return;
            }
            // @NOTE 区分多选和非多选的情况
            if (this.multiple) {
                let _index = this.currentValue.indexOf(data);
                // 添加或删除
                if (_index === -1) {
                    this.currentValue.push(data);
                } else {
                    this.currentValue.splice(_index, 1);
                }
                this.$emit('input', this.currentValue);
                this.$emit('select', this.currentValue);
            } else {
                this.selectChangeQuery = true;
                this.currentValue = data;
                this.$emit('input', data);
                this.$emit('select', data);
                this.hideMenu(true);
            }
        });
        // 添加option
        this.$on('select-add', child => {
            this.options.push({
                value: child.value,
                label:
                    child.label === undefined
                        ? child.$el.textContent
                        : child.label
            });

            child.selected = this.multiple
                ? this.currentValue.indexOf(child.value) !== -1
                : child.value === this.currentValue;

            child.index = this.optionInstances.length + 1;

            this.optionInstances.push(child);
        });
        // 删除option
        this.$on('select-del', child => {
            let i = this.options.findIndex(item => {
                return item.value === child.value;
            });

            this.options.splice(i, 1);
            let j = this.optionInstances.findIndex(item => {
                return item.value === child.value;
            });

            this.optionInstances.splice(i, 1);
        });
    },
    beforeDestroy() {
        this.unbindGlobalEvents();
    }
};
</script>

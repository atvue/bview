<template>
    <!-- 表格头 -->
    <thead :class="theadClass">
        <tr
            v-for="level in depth"
            :key="level"
        >
            <th
                v-for="col in $_getLevel(level)"
                v-show="!col.hidden"
                :key="col.key"
                :rowspan="$_getRowSpan(level, col)"
                :colspan="$_getColSpan(level, col)"
                :class="$_calThClass(col)"
                :style="{ width: col.width }"
                @click="$_onHeadClick(col)"
            >
                <!-- checkbox -->
                <template v-if="col.type === 'checkbox'">
                    <Checkbox
                        v-show="col.noNeedAll !== true"
                        :value="checked"
                        @on-change="$_onToggleCheck"
                    />
                </template>
                <!-- END checkbox -->
                <!-- 普通 -->
                <template v-else>
                    {{ col.title || '' }}
                    <!-- TODO: 可排序 -->
                    <!-- END 可排序 -->
                    <!-- TODO: 可筛选 -->
                    <Dropdown
                        v-if="$_canFilter(col)"
                        v-model="filterVisible"
                    >
                        <i @click="filterVisible = !filterVisible">
                            <Icon
                                :svg="tableFilter"
                                :class="`${prefixCls}-thead-icon`"
                            />
                        </i>
                        <div
                            slot="overlay"
                            :class="`${prefixCls}-thead-filter`"
                        >
                            <CheckboxGroup
                                v-model="currentFilter"
                                vertical
                            >
                                <Checkbox
                                    v-for="filter in col.filters"
                                    :key="filter"
                                    :value="filter"
                                >
                                    {{ filter }}
                                </Checkbox>
                            </CheckboxGroup>
                            <div class="`${prefixCls}-filter-btns`">
                                <Button
                                    type="small"
                                    @click="$_onToggleFilter(col)"
                                >
                                    确定
                                </Button>
                                <Button
                                    type="small"
                                    @click="$_onToggleFilter(col, true)"
                                >
                                    重置
                                </Button>
                            </div>
                        </div>
                    </Dropdown>
                    <!-- END 可筛选 -->
                </template>
                <!-- END 普通 -->
            </th>
        </tr>
    </thead>
    <!-- END 表格头 -->
</template>

<script>
import Checkbox from '../checkbox'
const { CheckboxGroup } = Checkbox
import Button from '../button'
import Dropdown from '../dropdown'

import { bviewPrefix as b } from '../../utils/macro'
import { findComponentUpward } from '../../utils/assist'

import Icon from '../icon'
import tableFilter from '../../icons/tableFilter'

export default {
    components: {
        Checkbox ,
        CheckboxGroup ,
        Button ,
        Dropdown ,
        Icon ,
    } ,
    props: {
        flatColumns: {
            type: Array ,
            default() {
                return []
            } ,
        } ,
        checked: {
            type: Boolean ,
            default: false ,
        } ,
        depth: {
            type: Number ,
            default: 1 ,
        } ,
    } ,
    data() {
        return {
            prefixCls: `${b}-table` ,
            currentFilter: [] ,
            filterVisible: false ,
        }
    } ,
    computed: {
        theadClass() {
            let { prefixCls , depth } = this
            return [
                `${prefixCls}-thead` ,
                { [ `${prefixCls}-thead-bordered` ]: depth > 1 } ,
            ]
        } ,
    } ,
    created() {
        this.tableFilter = tableFilter
    } ,
    mounted() {
        this.$_tableParent = findComponentUpward( this , `Table` )
    } ,
    methods: {
        $_calThClass( col ) {
            let { prefixCls } = this ,
                { align , className } = col

            return [
                { [ `${prefixCls}-cell-${align}` ]: align !== undefined } ,
                className ,
            ]
        } ,
        $_onHeadClick() {} ,
        $_onToggleCheck( checked ) {
            this.$_tableParent.$_handleAllCheck( checked )
        } ,
        // 处理filter操作
        $_onToggleFilter( col , reset = false ) {
            this.filterVisible = false
            if ( reset ) {
                this.currentFilter = []
            }
            let { currentFilter } = this
            this.$_tableParent.$_handleFilter( currentFilter , col )
        } ,
        // 计算 rowspan
        $_getRowSpan( level , col ) {
            // hasChildren 抽取公共代码
            let { depth } = this
            if ( col.children ) {
                return undefined
            } else {
                return depth - level + 1
            }
        } ,
        // 计算 colspan
        $_getColSpan( level , col ) {
            let { flatColumns } = this ,
                downNodes = flatColumns.filter( c => {
                    return c.level > level && !c.children
                } )

            if ( !col.children ) {
                return undefined
            } else {
                // debugger
                return downNodes.length
            }
        } ,
        // 获取某一层所有节点
        $_getLevel( level ) {
            let { flatColumns } = this

            return flatColumns.filter( c => c.level === level )
        } ,
        // 列是否可筛选
        $_canFilter( col ) {
            return col.filters instanceof Array && col.filters.length > 0
        } ,
    } ,
}
</script>

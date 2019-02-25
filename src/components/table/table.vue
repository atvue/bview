// TODO // tbody 分组 // 固定头部 // 固定列 左侧 or 右侧 // 单选 radio // 排序
// 筛选 单选 可搜索
<template>
    <div :class="`${prefixCls}`">
        <!-- 预留：左侧固定列 -->
        <!-- 中间主体 -->
        <!-- 头部固定 -->
        <div :class="`${prefixCls}-mid`">
            <div
                v-if="yScrollable && showHead"
                :class="seperateHeadClass"
            >
                123
            </div>
            <!-- END 头部固定 -->
            <!-- table体 -->
            <div
                :class="tableBodyClass"
                :style="bodyStyles"
                @scroll="$_onScrollBody"
            >
                <table>
                    <TableHeader
                        v-if="!yScrollable && showHead"
                        :flat-columns="flatColumns"
                        :depth="columnsDepth"
                        :expand-options="expandOptions"
                        :checked="isAllChecked"
                    />

                    <TableBody
                        :columns="flatColumns.filter(c => !c.children)"
                        :depth="columnsDepth"
                        :rows="tbData"
                        :expand-options="expandOptions"
                        :row-key="rowKey"
                    />
                </table>
            </div>
            <!-- END table体 -->
        </div>
        <!-- END 中间主体 -->
    </div>
</template>

<script>
import { bviewPrefix as b } from '../../utils/macro'
import TableBody from './table-body'
import TableHeader from './table-head'

const JsonSafeDeepCopy = source => {
    return JSON.parse( JSON.stringify( source ) )
}

const traverseCols = ( cur , columns , level ) => {
    level && columns.push( { ...cur , level } )
    if (
        cur.children &&
        cur.children instanceof Array &&
        cur.children.length > 0
    ) {
        cur.children.forEach( col => {
            traverseCols( col , columns , level + 1 )
        } )
    }
}

export default {
    name: `Table` ,
    components: {
        TableBody ,
        TableHeader ,
    } ,
    props: {
        // @doc 是否显示表头
        showHead: {
            type: Boolean ,
            default: true ,
        } ,
        // @doc 列配置
        columns: {
            type: Array ,
            default() {
                return []
            } ,
        } ,
        // @doc 数据源配置
        dataSource: {
            type: Array ,
            default() {
                return []
            } ,
            required: true ,
        } ,
        // @doc 数据每行索引属性
        rowKey: {
            type: String ,
            default: `id` ,
        } ,
        /* @docbegin 行可展开配置
        {
            render (){} // 指定行展开后的render函数
        }
        @docend */
        expandOptions: {
            type: Object ,
            default() {
                return {}
            } ,
        } ,
    } ,
    data() {
        let { flatColumns , columnsDepth } = this.$_formatColumns( this.columns )
        return {
            prefixCls: `${b}-table` ,
            columnsDepth ,
            flatColumns ,
            tbData: this.$_formatTbData( this.dataSource ) ,
        }
    } ,
    computed: {
        // table 可横向滚动
        xScrollable() {
            return false
        } ,
        // table 可纵向滚动
        yScrollable() {
            return false
        } ,
        // 头部固定，分离table头
        seperateHeadClass() {
            let { prefixCls , xScrollable } = this
            return [
                `${prefixCls}-head` ,
                { [ `${prefixCls}-head-xscrollable` ]: xScrollable } ,
            ]
        } ,
        // table主体
        tableBodyClass() {
            let { prefixCls , xScrollable , yScrollable } = this
            return [
                `${prefixCls}-body` ,
                {
                    [ `${prefixCls}-body-xscrollable` ]: xScrollable ,
                    [ `${prefixCls}-body-yscrollable` ]: yScrollable ,
                } ,
            ]
        } ,
        // table body 高度
        bodyStyles() {
            let styles = {} ,
                { height } = this ,
                fixHeight = parseInt( height )
            if ( !isNaN( fixHeight ) ) {
                styles.maxHeight = `${this.height}px`
            }
            return styles
        } ,
        isAllChecked() {
            return (
                this.tbData.length > 0 &&
                this.tbData.filter( row => !row._isChecked ).length === 0
            )
        } ,
    } ,
    watch: {
        // 监控源数据变化
        dataSource: {
            handler( dataSource ) {
                this.tbData = this.$_formatTbData( dataSource )
                this.oriData = this.tbData.slice()
                // 每次数据变化时 判断是否有scrollbar 调整head样式
                // this.$nextTick(() => {
                //     if (this.$refs.bodyTable && this.styleMode === SCROLLABLE) {
                //         this.needScroll =
                //             this.bodyHeight < this.$refs.bodyTable.clientHeight;
                //     }
                // });
            } ,
            deep: true ,
        } ,
        // 展开所有含有children的column
        columns( val ) {
            this.flatColumns = this.$_formatColumns( val )
        } ,
    } ,
    mounted() {
        this.oriData = this.tbData.slice()
    } ,
    methods: {
        // 预留，用于横向滚动时同步固定头部的横向滚动
        $_onScrollBody() {} ,
        // 展开所有column
        $_formatColumns( columns ) {
            let _flatColumns = [] ,
                _start = { children: columns } ,
                { expandOptions } = this

            traverseCols( _start , _flatColumns , 0 )
            let temp = 1
            _flatColumns.forEach( col => {
                temp = Math.max( col.level , temp )
            } )
            // 追加功能列
            // 可展开
            if ( expandOptions.render instanceof Function ) {
                _flatColumns.unshift( {
                    key: `expand` ,
                    type: `expand` ,
                    level: 1 ,
                } )
            }
            // 可选择

            return { flatColumns: _flatColumns , columnsDepth: temp }
        } ,
        // 深拷贝并格式化传入dataSource
        $_formatTbData( dataSource ) {
            return dataSource.map( ele => {
                let newEle = JsonSafeDeepCopy( ele )
                // 加入状态
                if ( newEle._checked ) {
                    newEle._isChecked = newEle._checked
                } else {
                    newEle._isChecked = false
                }
                if ( newEle._expanded ) {
                    newEle._isExpanded = newEle._expanded
                } else {
                    newEle._isExpanded = false
                }
                if ( newEle._disabled ) {
                    newEle._isDisabled = newEle._disabled
                } else {
                    newEle._isDisabled = false
                }
                return newEle
            } )
        } ,
        // 处理行扩展
        $_handleExpand( row , index ) {
            let newState = !this.tbData[ index ]._isExpanded

            this.tbData[ index ]._isExpanded = newState

            this.$emit( `expand-row` , { row , index } )
        } ,
        // 处理行check
        $_handleCheck( row , index , checked ) {
            this.tbData[ index ]._isChecked = checked
        } ,
        // 处理全选
        $_handleAllCheck( checked ) {
            this.tbData.forEach( row => {
                row._isChecked = checked
            } )
        } ,
        // 处理筛选
        $_handleFilter( val , col ) {
            // reset
            if ( val.length === 0 ) {
                this.tbData = this.oriData.slice()
                return
            }
            if ( typeof col.filterMethod === `function` ) {
                this.tbData = this.oriData.filter( row => {
                    return col.filterMethod.call( this , val , row )
                } )
            }
        } ,
    } ,
}
</script>

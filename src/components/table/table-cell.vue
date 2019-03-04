<template>
    <td :class="$_calTdClass(col)">
        <!-- null/''/[] undefined暂时不处理-->
        <!-- <template v-if="row[col.key] === null||row[col.key] === ''||row[col.key] === []">
            {{ this.emptyData }}
        </template> -->
        <!-- END null/''/[] undefined暂时不处理 -->
        <!-- 功能列 -->
        <!-- checkbox -->
        <template v-if="col.type === 'checkbox'">
            <CheckBox
                :value="checked"
                @on-change="$_onToggleCheck"
            />
        </template>
        <!-- END checkbox -->
        <!-- radio -->
        <!-- <template v-else-if="col.type==='radio'">
            <label class="nop-radio">
                <span class="nop-radio-wrap">
                    <span
                        class="nop-radio-inner"
                        :class="{'nop-radio-inner-checked':selected}"
                    />
                    <input
                        type="radio"
                        class="nop-radio-input"
                        :checked="selected"
                        @change="onRadioChange"
                    >
                </span>
            </label>
        </template> -->
        <!-- END radio -->
        <!-- expand 文字模式 -->
        <!-- <template v-else-if="col.type==='expand'&&col.expandType==='text'">
            <span @click="onToggleExpand">
                <a href="javascript:void(0);">
                    {{ expanded?'收起':'展开' }}
                </a>
            </span>
        </template> -->
        <!-- END expand 文字模式 -->
        <!-- expand ICON模式 -->
        <template v-else-if="col.type === 'expand'">
            <span @click="$_onToggleExpand">
                <i :class="expandIconClass" />
            </span>
        </template>
        <!-- END expand ICON模式 -->
        <!-- END 功能列 -->
        <!-- 内容列 -->
        <!-- 渲染函数 -->
        <RenderCell
            v-else-if="typeof col.render === 'function'"
            :row="row"
            :col="col"
            :index="index"
            :render="col.render"
        />
        <!-- END 渲染函数 -->
        <!-- 普通文本 -->
        <template v-else>
            <span
                :title="row[col.key]"
                class="normal-txt"
            >
                {{ row[col.key] }}
            </span>
        </template>
        <!-- END 普通文本 -->
        <!-- END 内容列 -->
    </td>
</template>

<script>
import RenderCell from './helper/render'
import CheckBox from '../checkbox'
// import Icon from '../icon'
import { bviewPrefix as b } from '../../utils/macro'
import { findComponentUpward } from '../../utils/assist'

export default {
    components: { CheckBox , RenderCell } ,
    filters: {
        empty( val , emptyData ) {
            return !val && val !== 0 ? emptyData : val
        } ,
    } ,
    props: {
        row: {
            type: Object ,
            default() {
                return {}
            } ,
        } ,
        col: {
            type: Object ,
            default() {
                return {}
            } ,
        } ,
        index: {
            type: Number ,
            default: undefined ,
        } ,
        // 无数据时默认显示
        emptyData: {
            type: String ,
            default: `/` ,
        } ,
        checked: {
            type: Boolean ,
            default: false ,
        } ,
        expanded: {
            type: Boolean ,
            default: false ,
        } ,
        selected: {
            type: Boolean ,
            default: false ,
        } ,
    } ,
    data() {
        return {
            prefixCls: `${b}-table-cell` ,
        }
    } ,
    computed: {
        expandIconClass() {
            let { prefixCls , expanded } = this

            return [
                `${prefixCls}-expand-icon` ,
                { [ `${prefixCls}-expand-icon_expand` ]: expanded } ,
            ]
        } ,
    } ,
    watch: {} ,
    mounted() {
        this.$_tableParent = findComponentUpward( this , `Table` )
    } ,
    methods: {
        $_calTdClass( col ) {
            let { prefixCls } = this ,
                { align , className , type } = col ,
                isOprCell = type === `expand` || type === `checkbox`

            return [
                { [ `${prefixCls}-${align}` ]: align !== undefined } ,
                className ,
                { [ `${prefixCls}-opr` ]: isOprCell } ,
            ]
        } ,
        $_onToggleExpand() {
            this.$_tableParent.$_handleExpand( this.row , this.index )
        } ,
        $_onToggleCheck( checked ) {
            this.$_tableParent.$_handleCheck( this.row , this.index , checked )
        } ,
    } ,
}
</script>

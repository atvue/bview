<template>
    <tbody :class="tbodyClass">
        <template v-for="(row, index) in rows">
            <tr :key="getVueKeyRow(row, rowKey, index)">
                <TableCell
                    v-for="(col, cIndex) in columns"
                    :key="getVueKeyCol(col, cIndex)"
                    :style="{ width: col.width }"
                    :col="col"
                    :index="index"
                    :row="row"
                    :checked="$_isRowStatus(index, 'Checked')"
                    :expanded="$_isRowStatus(index, 'Expanded')"
                    :disabled="$_isRowStatus(index, 'Disabled')"
                    :empty-data="col.emptyData || emptyData"
                />
            </tr>
            <tr
                v-show="row._isExpanded"
                v-if="
                    expandOptions && typeof expandOptions.render === 'function'
                "
                :key="`${getVueKeyRow(row, rowKey, index)}_row_expand`"
            >
                <td
                    :colspan="columns.length"
                    :class="`${prefixCls}-row_expand`"
                >
                    <RenderCell
                        :row="row"
                        :index="index"
                        :render="expandOptions.render"
                    />
                </td>
            </tr>
        </template>
    </tbody>
</template>

<script>
import { bviewPrefix as b } from '../../utils/macro'
import TableCell from './table-cell'
import RenderCell from './helper/render'
import { getVueKeyRow , getVueKeyCol } from './helper/getVueKey'

export default {
    components: {
        TableCell ,
        RenderCell ,
    } ,
    props: {
        columns: {
            type: Array ,
            default() {
                return []
            } ,
        } ,
        rows: {
            type: Array ,
            default() {
                return []
            } ,
        } ,
        expandOptions: {
            type: Object ,
            default() {
                return {
                    type: `multiple` ,
                    trigger: `cell` ,
                }
            } ,
        } ,
        rowKey: {
            type: String ,
            default: `id` ,
        } ,
        emptyData: {
            type: String ,
            default: `/` ,
        } ,
        depth: {
            type: Number ,
            default: 1 ,
        } ,
    } ,
    data() {
        return {
            prefixCls: `${b}-table` ,
        }
    } ,
    computed: {
        tbodyClass() {
            let { prefixCls , depth } = this
            return [
                `${prefixCls}-tbody` ,
                { [ `${prefixCls}-tbody-bordered` ]: depth > 1 } ,
            ]
        } ,
    } ,
    mounted() {} ,
    methods: {
        getVueKeyRow ,
        getVueKeyCol ,
        $_isRowStatus( _index , type ) {
            return this.rows[ _index ] && this.rows[ _index ][ `_is${type}` ]
        } ,
    } ,
}
</script>

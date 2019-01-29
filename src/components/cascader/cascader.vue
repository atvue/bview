<template>
    <div :class="prefixCls + '-contain'">
        <span
            v-show="showValue"
            :class="prefixCls + '-value'"
        >
            {{ displayRender }}
        </span>
        <input
            id="input"
            v-model="query"
            v-click-out-el="handleClickOutSide"
            type="text"
            class="u-ipt"
            :placeholder="displayRender === '' ? placeholder : ''"
            :readonly="!filterable"
            @click="_toggleOpen"
            @input="_handleInput"
        >
        <span
            v-show="displayRender !== '' && (filterable || clearable)"
            class="clear"
            @click.stop="clearValue"
        >
            <Icon
                v-show="displayRender !== '' && (filterable || clearable)"
                :svg="close"
                :size="12"
                class="clear"
                @click.stop="clearValue"
            />
        </span>
        <div
            v-show="showDropDown"
            @click.stop="_doShowValue"
        >
            <div :class="prefixCls + '-dropdown-contain'">
                <Caspanel
                    v-show="!filterable || (filterable && query === '')"
                    ref="caspanel"
                    :prefix-cls="prefixCls"
                    :data="data"
                    :disabled="disabled"
                    :change-on-select="changeOnSelect"
                    :trigger="trigger"
                />
                <span
                    v-if="noChild"
                    class="no-result"
                >
                    无匹配结果
                </span>
                <div
                    v-show="
                        filterable && query !== '' && querySelections.length
                    "
                    :class="[prefixCls + '-search-dropdown']"
                >
                    <ul :class="[selectPrefixCls + '-dropdown-list']">
                        <!-- eslint-disable -->
                        <li
                            v-for="(item, index) in querySelections"
                            :key="index"
                            :class="[
                                selectPrefixCls + '-item',
                                {
                                    [selectPrefixCls +
                                    '-item-disabled']: item.disabled
                                }
                            ]"
                            @click="_handleSelectItem(index)"
                            v-html="item.display"
                        />
                        <!-- eslint-enable -->
                    </ul>
                </div>
                <div
                    v-show="
                        filterable && query !== '' && !querySelections.length
                    "
                    :class="[prefixCls + '-search-dropdown']"
                >
                    <p
                        class="nodate"
                        @click.stop="$event.preventDefault"
                    >
                        无匹配结果
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Caspanel from './caspanel.vue'
import Icon from '../icon'
import close from '../../icons/close'
import Emitter from '../../utils/emitter'
import { oneOf } from '../../utils/assist'
import clickOutEl from '../../directives/click-out-el'

const prefixCls = `at-cascader`
const selectPrefixCls = `at-select`

export default {
    name: `Cascader` ,
    components: {
        Caspanel ,
        Icon
    } ,
    directives: { clickOutEl } ,
    mixins: [ Emitter ] ,
    props: {
        // 可选项的数据源
        data: {
            type: Array ,
            default() {
                return []
            }
        } ,
        // 是否禁用选择器
        disabled: {
            type: Boolean ,
            default: false
        } ,
        // 是否支持清空输入框
        clearable: {
            type: Boolean ,
            default: false
        } ,
        // 当前已选项的数据
        value: {
            type: Array ,
            default() {
                return []
            }
        } ,
        // 是否选中即改变
        changeOnSelect: {
            type: Boolean ,
            default: false
        } ,
        // 交互方式
        trigger: {
            validator( value ) {
                return oneOf( value , [ `click` , `hover` ] )
            } ,
            default: `click`
        } ,
        // 结果展示方式
        renderFormat: {
            type: Function ,
            default( label ) {
                return label.join( ` / ` )
            }
        } ,
        placeholder: {
            type: [ String , Number ] ,
            default: `请选择`
        } ,
        // 是否支持搜索
        filterable: {
            type: Boolean ,
            default: false
        } ,
        // 异步数据
        loadData: {
            type: Function ,
            default: () => {}
        }
    } ,
    data() {
        return {
            prefixCls: prefixCls ,
            selectPrefixCls ,
            showDropDown: false ,
            query: `` ,
            updatingValue: false , // to fix set value in changeOnSelect type
            selected: [] ,
            tmpSelected: [] ,
            currentValue: this.value ,
            isLoadedChildren: false ,
            validDataStr: `` ,
            showValue: true ,
            // 异步获取的子节点无数据
            noChild: false ,
            close
        }
    } ,
    computed: {
        displayRender() {
            let label = []
            this.selected.forEach( item => {
                label.push( item.label )
            } )
            return this.renderFormat( label , this.selected )
        } ,
        querySelections() {
            let selections = []
            function getSelections( arr , label , value ) {
                arr.forEach( item => {
                    item.__value = value ? value + `,` + item.value : item.value
                    item.__label = label
                        ? label + ` / ` + item.label
                        : item.label
                    item.__value = value ? value + `,` + item.value : item.value
                    if ( item.children && item.children.length ) {
                        getSelections( item.children , item.__label , item.__value )
                        delete item.__label
                        delete item.__value
                    } else {
                        selections.push( {
                            label: item.__label ,
                            value: item.__value ,
                            display: item.__label ,
                            item: item ,
                            disabled: !!item.disabled
                        } )
                    }
                } )
            }
            getSelections( this.data )
            selections = selections
                .filter( item => {
                    return item.label
                        ? item.label.indexOf( this.query ) > -1
                        : false
                } )
                .map( item => {
                    item.display = item.display.replace(
                        new RegExp( this.query , `g` ) ,
                        `<span>${this.query}</span>`
                    )
                    return item
                } )
            return selections
        }
    } ,
    watch: {
        showDropDown( val ) {
            if ( val ) {
                if ( this.currentValue.length ) {
                    this._updateSelected()
                }
            }
            this.$emit( `on-visible-change` , val )
        } ,
        value( val ) {
            this.currentValue = val
            if ( !val.length ) this.selected = []
        } ,
        currentValue() {
            // this.$emit('input', this.currentValue);
            if ( this.updatingValue ) {
                this.updatingValue = false
                return
            }
            this._updateSelected( true )
        } ,
        data: {
            deep: true ,
            handler() {
                const validDataStr = JSON.stringify(
                    this._getValidData( this.data )
                )
                if ( validDataStr !== this.validDataStr ) {
                    this.validDataStr = validDataStr
                    if ( !this.isLoadedChildren ) {
                        this.$nextTick( () => this._updateSelected( false ) )
                    }
                    this.isLoadedChildren = false
                }
            }
        }
    } ,
    created() {
        this.validDataStr = JSON.stringify( this._getValidData( this.data ) )
        this.$on( `on-result-change` , params => {
            // lastValue 点击最后一级
            // fromInit 初始化时更新
            const lastValue = params.lastValue
            const changeOnSelect = params.changeOnSelect
            const fromInit = params.fromInit
            if ( lastValue || changeOnSelect ) {
                const oldVal = JSON.stringify( this.currentValue )
                this.selected = this.tmpSelected
                let newVal = []
                this.selected.forEach( item => {
                    newVal.push( item.value )
                } )
                if ( !fromInit ) {
                    this.updatingValue = true
                    this.currentValue = newVal
                    this._emitValue( this.currentValue , oldVal )
                }
            }
            if ( lastValue && !fromInit ) {
                this.onClose()
            }
        } )
    } ,
    mounted() {
        this._updateSelected( true )
    } ,
    methods: {
        _toggleOpen() {
            if ( this.disabled ) return false
            if ( this.showDropDown ) {
                if ( !this.filterable ) {
                    this.onClose()
                }
            } else {
                this.onFocus()
            }
        } ,
        //@doc手动关闭级联选择器
        onClose() {
            this.showDropDown = false
        } ,
        //@doc手动选中级联选择器
        onFocus() {
            this.showDropDown = true
            if ( !this.currentValue.length ) {
                this.broadcast( `Caspanel` , `on-clear` )
            }
        } ,
        //@doc当外部被点击时调用
        handleClickOutSide() {
            if ( this.showDropDown && !this.filterable ) {
                this.onClose()
            }
        } ,
        _handleSelectItem( index ) {
            let item = this.querySelections[ index ]
            if ( item.item.disabled ) return false
            this.query = ``
            let oldVal = JSON.stringify( this.currentValue )
            this.currentValue = item.value.split( `,` )
            this._emitValue( this.currentValue , oldVal )
            this.onClose()
        } ,
        _emitValue( val , oldVal ) {
            if ( JSON.stringify( val ) !== oldVal ) {
                this.$emit(
                    `on-change` ,
                    this.currentValue ,
                    JSON.parse( JSON.stringify( this.selected ) )
                )
                // 对于表单中使用级联选择器，触发表单变更事件
                // this.$nextTick(() => {
                //     this.dispatch('FormItem', 'on-form-change', {
                //         value: this.currentValue,
                //         selected: JSON.parse(JSON.stringify(this.selected))
                //     });
                // });
            }
        } ,
        // 更新选中
        _updateSelected( init = false ) {
            if ( this.changeOnSelect || init ) {
                this.broadcast( `Caspanel` , `on-find-selected` , {
                    value: this.currentValue
                } )
            }
        } ,
        _updateResult( result ) {
            this.tmpSelected = result
        } ,
        // 排除 loading 后的 data，避免重复触发 updateSelect
        _getValidData( data ) {
            return data.map( item => this._deleteData( item ) )
        } ,
        _deleteData( item ) {
            const new_item = Object.assign( {} , item )
            if ( `loading` in new_item ) {
                delete new_item.loading
            }
            if ( `__value` in new_item ) {
                delete new_item.__value
            }
            if ( `__label` in new_item ) {
                delete new_item.__label
            }
            if ( `children` in new_item && new_item.children.length ) {
                new_item.children = new_item.children.map( i =>
                    this._deleteData( i )
                )
            }
            return new_item
        } ,
        _handleInput( event ) {
            this.noChild = false
            this.showValue = false
            this.query = event.target.value
        } ,
        _doShowValue() {
            this.query = ``
            this.showValue = true
        } ,
        //@doc手动清空值
        clearValue() {
            if ( this.disabled ) {
                return
            }
            this.selected = []
            const oldVal = JSON.stringify( this.currentValue )
            this.currentValue = []
            this._emitValue( this.currentValue , oldVal )
            this.onClose()
        }
    }
}
</script>

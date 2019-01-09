<template>
    <Dropdown
        v-model="visibleOptions"
        @dropdown-open="_dropdownOpen"
        @dropdown-closed="_dropdownClosed"
    >
        <div 
            ref="select"
            :class="bClsSelectWrapper"
            @click="_toggleOptions"
        >
            <div 
                :class="bClsSelectInner"
            >
                <div 
                    :class="bClsSelectLegend"
                >
                    <span 
                        v-if="hasSelected"
                        :class="bClsSelectValue"
                    >
                        {{ selected.label }}
                    </span>
                    <span 
                        v-else
                        :class="bClsPlaceholder"
                    >
                        {{ placeholderLabel }}
                    </span>
                </div>
                <div 
                    :class="bClsSelectIcon"
                >
                    <Icon type="down" />
                </div>
            </div>
        </div>
        <div 
            slot="overlay"
            ref="selectDropdown"
            :class="bClsOptionsWrapper"
            :style="styleOptionWrapper"
        >
            <ul
                ref="optionBox"
                :class="bClsOptionsInner"
            >
                <slot />
            </ul>
        </div>
    </Dropdown>
</template>


<script>
import Dropdown from '../dropdown'
import Icon from '../icon'
import { bviewPrefix as b } from '../../utils/macro'
import options from './helper/options'
import keyboard from './helper/keyboard'
import scrollActiveIndex from './helper/scrollActiveIndex'
import { selectName } from './helper/name'

export default {
    name: selectName ,
    components: { Dropdown , Icon } ,
    mixins: [ options , keyboard , scrollActiveIndex ] ,
    props: {
        // @doc 占位提示符
        placeholder: {
            type: String ,
            default: undefined ,
        } ,
        // @doc v-model
        value: {
            type: null ,
            default: undefined ,
        } ,
        // @doc 默认false，则value值只是option代表的值，设置成true，则value是对象形式，参数中有label：{ value , label }
        labelInValue: {
            type: Boolean ,
            default: false ,
        } ,
    } ,
    data(){
        return {
            selected: undefined ,
            activeIndex: undefined ,
            visibleOptions: false ,
            styleOptionWrapper: undefined ,
        }
    } ,
    computed: {
        hasSelected(){
            return this.selected !== undefined
        } ,
        bClsSelectWrapper(){
            return `${b}-select-wrapper`
        } ,
        bClsSelectInner(){
            return `${b}-select-inner`
        } ,
        bClsSelectLegend(){
            return `${b}-select-legend`
        } ,
        bClsSelectValue(){
            return `${b}-select-value`
        } ,
        bClsSelectIcon(){
            return `${b}-select-icon`
        } ,
        bClsOptionsWrapper(){
            return `${b}-options-wrapper`
        } ,
        bClsOptionsInner(){
            return `${b}-options-inner`
        } ,
        bClsPlaceholder(){
            return `${b}-select-placeholder`
        } ,
        placeholderLabel(){
            let { placeholder } = this ,
                hasPlaceholder = placeholder !== undefined
            return hasPlaceholder ? placeholder : '\u2003'
        } ,
        activeOption(){
            let { activeIndex , options } = this
            if ( activeIndex === undefined ) {
                return undefined
            }
            return options[ activeIndex ]
        }
    } ,
    watch: {
        visibleOptions( val , oldVal ) {
            let changed = val !== oldVal ,
                calc = changed && val
            if ( calc ) {
                this._clacOptionWrapperWidth()
            }
        } ,
        value( val , oldVal ) {
            let changed = val !== oldVal
            if ( changed ) {
                this._syncValueWithSelected()
            }
        }
    } ,
    created(){
        this.__options = []
        this.$on( 'click-option' , this._clickOption )
        this.$on( 'register-option' , this._regsiterOption )
        this.$on( 'un-register-option' , this._unRegsiterOption )
        // 初次加载 填充legend
        this._setValue()
    } ,
    destroyed(){
        this.__options = undefined
    } ,
    methods: {
        _getSelectedOptionIndex(){
            let { selected , options , hasSelected } = this
            if ( hasSelected ) {
                let index = options.findIndex( item => item.value === selected.value ) ,
                    hasIndex = index > -1
                return hasIndex ? index : undefined
            } else {
                return undefined
            }
        } ,
        _toggleOptions(){
            let { visibleOptions } = this
            this.visibleOptions = !visibleOptions
        } ,
        _clacOptionWrapperWidth(){
            let { $refs: { select } } = this ,
                rect = select.getBoundingClientRect() ,
                { width } = rect
            this.styleOptionWrapper = `width: ${width}px`
        } ,
        _checkIfScrollOption(){
            let { activeIndex } = this ,
                hasActive = activeIndex !== undefined
            if ( hasActive ) {
                this._scrollOptions( activeIndex )
            }
        } ,
        _clickOption( { payload } ){
            let { value , label } = payload
            this.selected = { value , label }
            this._emitInput()
            this.visibleOptions = false
        } ,
        _setValue(){
            let { options , value , labelInValue } = this ,
                target = options.find( ( { value: val } ) => {
                    return labelInValue ? ( value.value === val ) : 
                        ( val === value )
                } ) ,
                hasValue = target !== undefined
            if ( hasValue ) {
                let index = options.findIndex( item => item === target )
                this.selected = { ...target }
                this.activeIndex = index
            }
        } ,
        _regsiterOption( vm ) {
            let { __options } = this
            __options.push( vm )
        } ,
        _unRegsiterOption( vm ) {
            let { __options } = this ,
                index = __options.indexOf( vm ) ,
                hasIndex = index > -1
            if( hasIndex ) {
                __options.splice( index , 1 )
            }
        } ,
        _dropdownOpen(){
            this._checkIfScrollOption()
        } ,
        _dropdownClosed(){
            this._resetActiveIndex()
        } ,
        _resetActiveIndex(){
            let index = this._getSelectedOptionIndex()
            if ( index !== undefined ) {
                this.activeIndex = index
            } else {
                this.activeIndex = undefined
            }
        } ,
        _keyEnter(){
            let { activeIndex , visibleOptions , options } = this ,
                noCalc = visibleOptions === false || 
                    activeIndex === undefined
            if ( noCalc ) {
                return
            }
            let targetOption = options[ activeIndex ] ,
                { value , label } = targetOption
            this.selected = { value , label }
            this._emitInput()
            this._toggleOptions()
        } ,
        _emitInput(){
            let { selected , labelInValue } = this ,
                { value , label } = selected
            // @doc 选中值变化触发input事件
            this.$emit( 'input' , labelInValue ? { value , label } : value )
        } ,
        _syncValueWithSelected(){
            let { value: outData , selected , hasSelected , labelInValue , options } = this ,
                selectdValue = hasSelected ? selected.value : undefined ,
                hasOutValue = outData !== undefined ,
                outDataValue = hasOutValue ? ( labelInValue ? outData.value : outData ) : 
                    undefined ,
                sameValue = outDataValue === selectdValue
            if ( sameValue ) {
                return
            }
            let clonedValue = hasOutValue ? ( labelInValue ? { ...outData } : outData ) : undefined ,
                newSelected = labelInValue ? clonedValue : { value: outData }
            // 追加label属性
            if ( labelInValue === false ) {
                let target = options.find( ( { value } ) => value === outData ) ,
                    hasTarget = target !== undefined ,
                    label = hasTarget ? target.label: undefined
                // 未找到label，设置展示值为value
                if ( label === undefined ) {
                    label = outData
                }
                Object.assign( newSelected , { label } )
            }
            this.selected = newSelected
            let index = this._getSelectedOptionIndex()
            this.activeIndex = index
        }
    } ,
}
</script>

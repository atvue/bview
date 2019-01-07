<template>
    <Dropdown
        v-model="visibleOptions"
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
            :class="bClsOptionsWrapper"
            :style="styleOptionWrapper"
        >
            <ul
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
import { selectName } from './helper/name'

export default {
    name: selectName ,
    components: { Dropdown , Icon } ,
    mixins: [ options , keyboard ] ,
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
        }
    } ,
    watch: {
        visibleOptions( val , newVal ) {
            let calc = val !== newVal && val
            if ( calc ) {
                this._clacOptionWrapperWidth()
            }
        }
    } ,
    created(){
        this.$on( 'click-option' , this._clickOption )
        // 初次加载 填充legend
        this._setValue()
    } ,
    methods: {
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
        _clickOption( { payload } ){
            let { value , label } = payload ,
                inputVal = value
            this.selected = { value , label }
            this.$emit( 'input' , inputVal )
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
                this.selected = { ...target }
            }
        }
    } ,
}
</script>

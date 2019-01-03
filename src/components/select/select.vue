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
import { camlizeName } from '../../utils/assist'
const nameKebab = `${b}-select` ,
    name = camlizeName( nameKebab )

export default {
    name ,
    components: { Dropdown , Icon } ,
    props: {
        // @doc 占位提示符
        placeholder: {
            type: String ,
            default: undefined ,
        }
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
        // eslint-disable-next-line
        _clickOption( { vm , payload } ){
            let { value , label } = payload ,
                inputVal = value
            this.selected = { value , label }
            this.$emit( 'input' , inputVal )
            this.visibleOptions = false
        }
    } ,
}
</script>

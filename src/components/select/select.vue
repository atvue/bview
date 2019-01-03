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
                    :class="bClsSelectValue"
                >
                    <span v-if="hasSelected">
                        {{ selected.label }}
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
        this.$on( 'clickOption' , data => {
            this._clickOption( data )
            return true ;
        } )
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
            let { value , label } = payload
            this.selected = { value , label }
        }
    } ,
}
</script>

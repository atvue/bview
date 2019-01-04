<template>
    <li
        ref="el"
        :class="bClsOption"
        @click="_clickOption"
    >
        <Icon 
            v-if="selected"
            type="check"
            :class="bClsOptionSelectedIcon"
        />
        <slot />
    </li>
</template>


<script>
import { findComponentUpward } from '../../utils/assist'
import Icon from '../icon'
import { optionName , selectName } from './helper/name'
import { bviewPrefix as b } from '../../utils/macro'

export default {
    name: optionName ,
    components: {
        Icon ,
    } ,
    props: {
        // @doc 值
        value: {
            type: null ,
            required: true ,
        } ,
        // @doc 禁用
        disabled: {
            type: Boolean ,
            default: false ,
        }
    } ,
    computed: {
        selectVm(){
            let parent = findComponentUpward( this , selectName )
            return parent
        } ,
        bClsOption(){
            let { selected , disabled } = this ,
                cls = `${b}-option`
            if ( disabled ) {
                cls += ` ${b}-option-disabled`
            } else if ( selected ) {
                cls += ` ${b}-option-selected`
            }
            return cls
        } ,
        bClsOptionSelectedIcon(){
            return `${b}-option-selected-icon`
        } ,
        selected(){
            let { selectVm } = this ,
                { selected } = selectVm ,
                selted = selected.value === this.value
            return selted
        } ,
    } ,
    methods: {
        _clickOption(){
            let { value , $refs: { el } , selectVm , disabled } = this ,
                noSelect = selectVm === undefined ,
                noEl = el === undefined ,
                skip = noSelect || noEl || disabled ,
                { textContent } = noEl ? {} : el ,
                payload = { value , label: textContent }
            if ( skip ) {
                return
            }
            // -@doc
            selectVm.$emit( 'click-option' , { vm: this , payload } )
        }
    }
}
</script>

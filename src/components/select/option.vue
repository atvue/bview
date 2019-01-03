<template>
    <li
        ref="el"
        :class="bClsOption"
        @click="clickOption"
    >
        <slot />
    </li>
</template>


<script>
import { findComponentUpward } from '../../utils/assist'
import { optionName , selectName } from './helper/name'
import { bviewPrefix as b } from '../../utils/macro'

export default {
    name: optionName ,
    props: {
        // @doc 值
        value: {
            type: null ,
            required: true ,
        }
    } ,
    computed: {
        selectVm(){
            let parent = findComponentUpward( this , selectName )
            return parent
        } ,
        bClsOption(){
            let { selected } = this ,
                cls = `${b}-option`
            if ( selected ) {
                cls += ` ${b}-option-selected`
            }
            return cls
        } ,
        selected(){
            let { selectVm } = this ,
                { selected } = selectVm ,
                selted = selected.value === this.value
            return selted
        } ,
    } ,
    methods: {
        clickOption(){
            let { value , $refs: { el } , selectVm } = this ,
                noSelect = selectVm === undefined ,
                noEl = el === undefined ,
                skip = noSelect || noEl ,
                { textContent } = noEl ? {} : el ,
                payload = { value , label: textContent }
            if ( skip ) {
                return
            }
            selectVm.$emit( 'click-option' , { vm: this , payload } )
        }
    }
}
</script>

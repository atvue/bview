<template>
    <li
        ref="el"
        class="bview-select-dropdown-menu-item"
        @click="clickOption"
    >
        <slot />
    </li>
</template>


<script>
import { findComponentUpward , camlizeName } from '../../utils/assist'
import { bviewPrefix as b } from '../../utils/macro'
const name = camlizeName( `${b}-option` ) ,
    parentName = camlizeName( `${b}-select` )

export default {
    name ,
    props: {
        // @doc 值
        value: {
            type: null ,
            required: true ,
        }
    } ,
    computed: {
        selectVm(){
            let parent = findComponentUpward( this , parentName )
            return parent
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
            selectVm.$emit( 'clickOption' , { vm: this , payload } )
        }
    }
}
</script>

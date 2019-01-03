<template>
    <Dropdown
        v-model="visibleOptions"
    >
        <div 
            ref="select"
            class="bview-select-wrapper"
            @click="_toggleOptions"
        >
            <div 
                class="bview-select-inner"
            >
                <div 
                    class="bview-select-value"
                >
                    <span v-if="hasSelected">
                        {{ selected.label }}
                    </span>
                </div>
                <div 
                    class="bview-select-icon"
                >
                    <Icon type="down" />
                </div>
            </div>
        </div>
        <div 
            slot="overlay"
            class="bview-options-wrapper"
            :style="styleOptionWrapper"
        >
            <ul
                class="options-inner"
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
const name = camlizeName( `${b}-select` )

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
            styleOptionWrapper: '' ,
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
    computed: {
        hasSelected(){
            return this.selected !== undefined
        }
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
        _clickOption( { vm , payload } ){
            let { value , label } = payload
            this.selected = { value , label }
        }
    } ,
    created(){
        this.$on( 'clickOption' , this._clickOption )
    }
}
</script>

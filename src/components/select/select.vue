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
                    这是值的占位符
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

export default {
    components: { Dropdown , Icon } ,
    props: {
        placeholder: {
            type: String ,
        }
    } ,
    data(){
        return {
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
        }
    }
}
</script>

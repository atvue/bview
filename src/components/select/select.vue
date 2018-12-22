<template>
    <Dropdown
        v-model="visibleOptions"
    >
        <div 
            class="bview-select-wrapper"
            @click="click"
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
                    loading
                </div>
            </div>
        </div>
        <div 
            class="bview-options-wrapper"
            slot="overlay"
        >
            <ul>
                <slot />
            </ul>
        </div>
    </Dropdown>
</template>


<script>
import Dropdown from '../dropdown'

export default {
    components: { Dropdown } ,
    data(){
        return {
            visibleOptions: false ,
        }
    } ,
    methods: {
        click(){
            let { visibleOptions } = this

            this.visibleOptions = !visibleOptions
        }
    }
}
</script>

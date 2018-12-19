<template>
    <div
        v-dom-portal="config"
    >
        <div>
            <slot />
        </div>
    </div>
</template>


<script>
import domPortal from '../../directives/dom-portal'
export default {
    props: {
        symbol: {
            type: [ Symbol , String ] ,
        }
    } ,
    directives: { 
        domPortal
    } ,
    computed: {
        config(){
            return {
                symbol: this.symbol
            }
        }
    }
}
</script>

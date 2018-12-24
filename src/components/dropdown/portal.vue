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
        } ,
        getPopupContainer: {
            type: Function
        }
    } ,
    directives: { 
        domPortal ,
    } ,
    computed: {
        config(){
            let { getPopupContainer , symbol } = this ,
                target = getPopupContainer() ,
                config = {
                    symbol ,
                }
            if ( target !== undefined && target !== null ) {
                Object.assign( config , { target } )
            }
            return config
        }
    }
}
</script>

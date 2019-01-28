<template>
    <div v-dom-portal="config">
        <div>
            <slot />
        </div>
    </div>
</template>

<script>
import domPortal from '../../directives/dom-portal' ;
export default {
    directives: {
        domPortal
    } ,
    props: {
        symbol: {
            type: [ Symbol , String ] ,
            default: undefined
        } ,
        getPopupContainer: {
            type: Function ,
            default: undefined
        }
    } ,
    computed: {
        config() {
            let { getPopupContainer , symbol } = this ,
                target = getPopupContainer() ,
                config = {
                    symbol
                } ;
            if ( target !== undefined && target !== null ) {
                Object.assign( config , { target } ) ;
            }
            return config ;
        }
    }
} ;
</script>

<template>
    <div
        id="bview-portal"
        v-dom-portal
    >
        <div>
            <slot />
        </div>
    </div>
</template>


<script>
import domPortal from '../../directives/dom-portal'
export default {
    directives: { 
        domPortal
    } ,
}
</script>

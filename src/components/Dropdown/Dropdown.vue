<template>
    <div class="bview-dropdown">
        <slot />
        <div class="bview-dropdown-overlay">
            <slot name="overlay" />
        </div>
    </div>
</template>


<script>
export default {
	name: 'dropdown' ,
    data(){
        return {

        }
    } ,
    created(){
    }
}
</script>

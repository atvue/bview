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
export default {
    props: {
        // @doc 值
        value: {
            type: null ,
            required: true ,
        }
    } ,
    methods: {
        clickOption(){
            let { value , $refs: { el } } = this
            console.log( el )
        }
    }
}
</script>

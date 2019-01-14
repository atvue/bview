<template>
    <div :class="`${b}-tag`">
        <slot />
    </div>
</template>

<script>
import { bviewPrefix as b } from '../../utils/macro'

export default {
    name: 'Tag' ,
    props: {

    } ,
    data () {
        return {
            b ,
        }
    } ,
    methods: {

    } ,
}
</script>
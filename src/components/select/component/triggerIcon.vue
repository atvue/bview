

<template>
    <div 
        :class="`${b}-select-icon`"
    >
        <Icon 
            type="down" 
            :class="clsIconDown"
            @click="_clickUpDown"
        />
    </div>
</template>


<script>
import Icon from '../../icon'
export default {
    components: { Icon } ,
    props: {
        b: {
            type: String ,
            required: true ,
        } ,
        visible: {
            type: Boolean ,
            required: true ,
        }
    } ,
    computed: {
        clsIconDown(){
            let { visible , b } = this
            // visible = true
            return visible ? `${b}-down-turn-up` : undefined
        }
    } ,
    methods: {
        _clickUpDown( event ){
            this.$emit( 'click' , event )
        }
    }
}
</script>

<template>
    <div :class="`${b}-select-icon`">
        <Icon
            :svg="down"
            :class="clsIconDown"
            :size="18"
            @click="_clickUpDown"
        />
    </div>
</template>

<script>
import Icon from '../../icon';
import down from '../../../icons/left_arrow';

export default {
    components: { Icon } ,
    props: {
        b: {
            type: String ,
            required: true
        } ,
        visible: {
            type: Boolean ,
            required: true
        }
    } ,
    data() {
        return {
            down
        };
    } ,
    computed: {
        clsIconDown() {
            let { visible , b } = this ,
                cls = `${b}-down`;
            // visible = true
            return visible ? cls + ` ${b}-down-turn-up` : cls;
        }
    } ,
    methods: {
        _clickUpDown( event ) {
            this.$emit( `click` , event );
        }
    }
};
</script>

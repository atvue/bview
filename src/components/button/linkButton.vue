<template>
    <a href="javascript:void(0);" @click="click" :class="calClass">
        <slot></slot>
    </a>
</template>

<script>
const TYPE_PRIMARY = 'primary';
const TYPE_DEFAULT = 'default';

export default {
    name: 'nop-linkbutton',
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: TYPE_PRIMARY
        }
    },
    computed: {
        calClass() {
            let { type, disabled } = this;
            return ['nop-link-btn', { disabled: disabled }, `link-btn_${type}`];
        }
    },
    methods: {
        click() {
            if (!this.disabled) {
                this.$emit('click');
            }
        }
    }
};
</script>

<template>
    <div :class="`${prefixCls}-breadcrumb`">
        <slot></slot>
    </div>
</template>


<script>
const defaultSeparator = '/';
const prefix = 'nop';

export default {
    name: 'nop-breadcrumb',
    props: {
        prefixCls: {
            type: String,
            default: prefix
        },
        separator: {
            type: String,
            default: defaultSeparator
        }
    },
    mounted() {
        this.setChildSeparator();
    },
    methods: {
        setChildSeparator() {
            this.$children.forEach(child => {
                child.separator = this.separator;
            });
        }
    },
    watch: {
        separator() {
            this.setChildSeparator();
        }
    }
};
</script>



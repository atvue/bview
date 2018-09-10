// from iview
<template>
    <i :class="classes" :style="styles" :title="title" @click="onClick" />
</template>
<script>
const prefixCls = 'nopIcon';

export default {
    name: 'nop-icon',
    props: {
        type: String,
        size: [Number, String],
        color: String,
        title: String
    },
    computed: {
        classes() {
            return `${prefixCls} nicon-${this.type}`;
        },
        styles() {
            let style = {};

            if (this.size) {
                style['font-size'] = `${this.size}px`;
            }

            if (this.color) {
                style.color = this.color;
            }

            return style;
        }
    },
    methods: {
        onClick(e) {
            this.$emit('click', e);
        }
    }
};
</script>

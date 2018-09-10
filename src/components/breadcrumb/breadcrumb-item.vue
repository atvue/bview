<template>
    <span :class="`${prefixCls}-breadcrumb-item`">
        <a :class="`${prefixCls}-breadcrumb-item_link`" v-if="showLink" @click="handleClick">
            <slot></slot>
        </a>
        <span :class="`${prefixCls}-breadcrumb-item_label`" v-else>
            <slot></slot>
        </span>
        <span :class="`${prefixCls}-breadcrumb-item_separator`" v-html="separator"></span>
    </span>
</template>


<script>
const prefix = 'nop';

export default {
    name: 'nop-breadcrumb-item',
    props: {
        prefixCls: {
            type: String,
            default: prefix
        },
        to: {
            type: [String, Object]
        }
    },
    data() {
        return {
            separator: undefined
        };
    },
    computed: {
        showLink() {
            return this.to !== undefined && this.to !== null;
        }
    },
    methods: {
        handleClick() {
            if (this.$router) {
                this.$router.push(this.to);
            } else {
                window.location.href = this.to;
            }
        }
    }
};
</script>



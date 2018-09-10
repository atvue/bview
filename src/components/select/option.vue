<template>
    <li class="nop-select-option" :class="classes" :title="title" @click.stop="select" v-show="!hidden">
        <slot>{{showLabel}}</slot>
    </li>
</template>

<script>
import Emitter from '@/mixins/emitter';

export default {
    name: 'nop-select-option',
    mixins: [Emitter],
    props: {
        value: {
            type: [String, Number],
            required: true
        },
        disabled: {
            type: Boolean,
            default: false
        },
        label: {
            type: String
        }
    },
    data() {
        return {
            selected: false,
            isFocus: false,
            hidden: false,
            index: undefined
        };
    },
    computed: {
        showLabel() {
            return this.label ? this.label : this.value;
        },
        title() {
            let title;
            if (this.label !== undefined) {
                title = this.label;
            } else if (this.$slots.default) {
                title = this.getChildrenTextContent(this.$slots.default);
            } else if (
                this.value !== undefined ||
                this.value !== null ||
                this.value !== ''
            ) {
                title = this.value;
            }
            return title;
        },
        classes() {
            return {
                selected: this.selected,
                focus: this.isFocus,
                disabled: this.disabled
            };
        }
    },
    beforeDestroy() {
        // 通知父层删除
        this.dispatch('nop-select', 'select-del', this);
    },
    methods: {
        select() {
            if (this.disabled) {
                return false;
            }
            this.dispatch('nop-select', 'selected', this.value);
        },
        onSelectClose() {
            this.isFocus = false;
            this.hidden = false;
        },
        getChildrenTextContent(children) {
            return children
                .map(function(node) {
                    return node.children
                        ? getChildrenTextContent(node.children)
                        : node.text;
                })
                .join('');
        },
        onSelectFilter(val) {
            let last = this.hidden;
            this.hidden = this.title.indexOf(val) === -1;
        },
        onSelecVisible() {
            !this.hidden && this.select();
        },
        changeSelect(val) {
            // debugger;
            if (val instanceof Array) {
                // debugger;
                this.selected = val.indexOf(this.value) !== -1;
            } else {
                this.selected = this.value === val;
            }
        }
    },
    mounted() {
        this.$on('select-close', this.onSelectClose);
        this.$on('select-filter', this.onSelectFilter);
        this.$on('select-visible', this.onSelecVisible);
        this.$on('select', this.changeSelect);
        this.dispatch('nop-select', 'select-add', this);
    },
    created() {}
};
</script>

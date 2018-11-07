// 通用按钮组件
// 可用 禁用 hover状态
<template>
    <button :disabled="disabled" @click.prevent="onClick" :class="boxlassName">
        <i v-if="loading"></i>
        <!-- <Icon v-if="icon&&!loading" :type="icon" :size="iconsize" :color="iconcolor"></Icon> -->
        <span v-if="showSlot">
            <slot></slot>
        </span>
    </button>
</template>

<script>
const TypePrimary = 'primary';
const TypeDefault = 'default';
const SizeNormal = '';
const SizeBig = 'big';
const SizeSmall = 'small';
const TypeBlack = 'black';

export default {
    components: {
        // Icon
    },
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        },
        icon: {
            type: String
        },
        iconsize: {
            type: Number,
            default: 12
        },
        iconcolor: {
            type: String,
            default: '#ffffff'
        },
        showSlot: {
            type: Boolean,
            default: true
        },
        size: {
            type: String,
            default: SizeNormal
        },
        type: {
            type: String,
            default: TypePrimary
        }
    },
    data() {
        return {};
    },
    computed: {
        boxlassName() {
            let { type, size } = this;
            return [
                'nop-button',
                {
                    'nop-button-default': type === TypeDefault
                },
                `nop-button-size${size}`,
                {
                    'nop-button-black': type === TypeBlack
                }
            ];
        }
    },
    methods: {
        onClick(event) {
            this.$emit('click');
        }
    }
};
</script>



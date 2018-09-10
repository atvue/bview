// 全局弹框组件
// 使用slot填充弹框内容
// 使用：
// <nop-modal title="测试" ref="modal">啦啦啦啦，这是一个测试弹框</nop-modal>
// API：
// this.$refs.modal.show()
// this.$refs.modal.close()
// 事件：
// on-cancel  on-confirm
<template>
    <transition name="fadeIn">
        <div v-if="visible" :class="`${prefixCls}`">
            <div :class="`${prefixCls}-wrap`">
                <div :class="`${prefixCls}-win`">
                    <i :class="`${prefixCls}-close`" v-if="closable" @click="onClose()">
                        <Icon type="close"></Icon>
                    </i>
                    <div :class="`${prefixCls}-head`" v-if="title!==''">
                        {{title}}
                    </div>
                    <div :class="`${prefixCls}-body`">
                        <slot></slot>
                    </div>
                    <div :class="`${prefixCls}-foot`">
                        <!-- 按钮区 -->
                        <slot name="button">
                            <button v-if="confirmTxt!==''" :class="`${prefixCls}-btn`" :style="confirmButtonStyle" @click.prevent="onConfirm" :disabled="confirmLock" type="button">{{confirmTxt}}</button>
                            <button v-if="cancelTxt!==''" :class="`${prefixCls}-btn close`" :style="cencelButtonStyle" @click.prevent="onCancel" type="button">{{cancelTxt}}</button>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import Vue from 'vue';
import Icon from '@/components/icon';

const prefix = 'nop';

let Modal = Vue.extend({
    name: 'nop-modal',
    components: {
        Icon
    },
    props: {
        prefixCls: {
            type: String,
            default: `${prefix}-modal`
        },
        title: {
            type: String,
            default: ''
        },
        confirmTxt: {
            type: String,
            default: '确定'
        },
        cancelTxt: {
            type: String,
            default: '取消'
        },
        closable: {
            type: Boolean,
            default: true
        },
        value: {
            type: Boolean,
            default: false
        },
        cancelButtonColor: {
            type: String,
            default: ''
        },
        cancelTextColor: {
            type: String,
            default: ''
        },
        confirmButtonColor: {
            type: String,
            default: ''
        },
        confirmTextColor: {
            type: String,
            default: ''
        },
        confirmHidden: {
            type: Boolean,
            default: false
        },
        confirmLock: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            visible: this.value
        };
    },
    watch: {
        value(val) {
            this.visible = val;
        }
    },
    computed: {
        cencelButtonStyle() {
            let _style = {
                'background-color': this.cancelButtonColor,
                color: this.cancelTextColor
            };
            if (
                this.cancelButtonColor.toLowerCase() == '#fff' ||
                this.cancelButtonColor.toLowerCase() == '#ffffff'
            ) {
                _style.border = 'solid 1px #aaa';
            }
            return _style;
        },
        confirmButtonStyle() {
            let _style = {
                'background-color': this.confirmButtonColor,
                color: this.confirmTextColor
            };
            return _style;
        }
    },
    mounted() {},
    methods: {
        show() {
            this.visible = true;
            this.$emit('input', true);
        },
        close() {
            this.visible = false;
            this.$emit('input', false);
        },
        onClose() {
            this.visible = false;
            this.$emit('input', false);
            this.$emit('on-cancel');
            this.$emit('cancel');
        },
        onConfirm() {
            if (this.confirmHidden) {
                this.visible = false;
                this.$emit('input', false);
            }
            this.$emit('on-confirm');
            this.$emit('confirm');
        },
        onCancel() {
            this.onClose();
        }
    }
});

export default Modal;
</script>


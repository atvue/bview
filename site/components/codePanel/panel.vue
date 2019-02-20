<template>
    <div
        ref="panel"
        class="bPanel"
    >
        <CollapseTransition>
            <div
                v-show="isActive"
                class="bPanel-body-wrapper"
            >
                <div
                    ref="codeContent"
                    class="bPanel-body"
                >
                    <div class="code-operate">
                        <span class="code-icon">
                            <Icon
                                :svg="magnifierIcon"
                                @click="magnifierCode"
                            />
                        </span>
                        <span class="code-icon">
                            <Icon
                                :svg="copyIcon"
                                @click="copyCode"
                            />
                        </span>
                    </div>
                    <slot name="content" />
                </div>
            </div>
        </CollapseTransition>
        <div
            :class="['bPanel-footer', { 'is-fixed': fixedControl }]"
            @click="toggle"
        >
            <span
                class="bPanel-footer-state"
                v-text="activeText"
            />
        </div>
    </div>
</template>
<script>
import CollapseTransition from './collapse-transition'
import copy from '@/icons/copy'
import magnifier from '@/icons/magnifier'
export default {
    name: `CodePanel` ,
    components: {
        CollapseTransition ,
    } ,
    data() {
        return {
            isActive: false ,
            fixedControl: false ,
            scrollEle: null ,
            copyIcon: copy ,
            magnifierIcon: magnifier ,
        }
    } ,
    computed: {
        activeText() {
            return this.isActive ? `收起代码` : `展开代码`
        } ,
    } ,
    watch: {
        isActive( val ) {
            let t = this
            if ( !val ) {
                this.fixedControl = false
                return
            }
            this.removeScrollHandler()
            setTimeout( () => {
                t.scrollEle = window
                t.scrollEle.addEventListener( `scroll` , t.scrollHandler )
                t.scrollHandler()
            } , 300 )
        } ,
    } ,
    destroyed() {
        this.removeScrollHandler()
    } ,
    methods: {
        toggle() {
            this.isActive = !this.isActive
        } ,
        scrollHandler() {
            let { top , bottom } = this.$refs.panel.getBoundingClientRect()
            let clientHeight = document.documentElement.clientHeight
            this.fixedControl =
                bottom > clientHeight && top + 40 <= clientHeight
        } ,
        removeScrollHandler() {
            this.scrollEle &&
                this.scrollEle.removeEventListener( `scroll` , this.scrollHandler )
        } ,
        copyCode() {
            let range = document.createRange()
            range.selectNode( this.$refs.codeContent )
            const selection = window.getSelection()
            if ( selection.rangeCount > 0 ) selection.removeAllRanges() // 将已经包含的已选择的对象清除掉
            selection.addRange( range )
            try {
                var successful = document.execCommand( `copy` , false )
                if ( successful ) {
                    alert( `复制成功` )
                    selection.removeAllRanges()
                }
            } catch ( error ) {
                // console.warn( error )
            }
        } ,
        magnifierCode() {} ,
    } ,
}
</script>
<style lang="less">
.bPanel {
    border: 1px solid #ebebeb;
    border-top: none;
    line-height: 0;
    .bPanel-body {
        position: relative;
        .code-operate {
            position: absolute;
            top: 10px;
            right: 20px;
            cursor: pointer;
            .code-icon {
                display: inline-block;
                padding: 0 3px;
            }
        }
    }
    .bPanel-footer {
        position: relative;
        border-top: 1px solid #ebebeb;
        background-color: #fff;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        text-align: center;
        margin-top: -1px;
        color: #d3dce6;
        cursor: pointer;
        height: 40px;
        line-height: 40px;
        &:hover {
            background: #f9fafc;
        }
        .bPanel-footer-state {
            display: inline-block;
            height: 100%;
            color: #2c80ff;
            &:after {
                clear: both;
            }
        }
    }
    .is-fixed {
        position: fixed;
        bottom: 0;
        width: calc(100% - 415px);
        border: 1px solid #ebebeb;
    }
    .collapse-transition {
        transition: height 0.3s ease-in-out, padding-top 0.3s ease-in-out,
            padding-bottom 0.3s ease-in-out;
    }
}
</style>

<template>
    <div
        ref="target"
        v-click-out-el="_clickOutEl"
        :class="prefixCls"
        @click="_clickTrigger"
        @mouseenter="_mouseEnter"
        @mouseleave="_mouseLeave"
        @contextmenu="_contextMenu"
    >
        <!-- 触发器 -->
        <slot />
        <Portal
            v-if="visiblePortal"
            :class="clsDropPortal"
            :symbol="symbolPortal"
            :get-popup-container="getPopupContainer"
        >
            <Motion
                tag="div"
                :values="anim"
                :spring="$data.$spring"
                @motion-end="$_motionEnd"
            >
                <div
                    v-if="visible"
                    ref="source"
                    slot-scope="{ offset, opacity }"
                    :style="{ transform: `translateY(${offset}px)`, opacity }"
                    :class="clsOverlay"
                    @mouseenter="_mouseEnter"
                    @mouseleave="_mouseLeave"
                    @click="_mouseLeave"
                >
                    <!-- 下拉组件 -->
                    <slot name="overlay" />
                </div>
            </Motion>
        </Portal>
    </div>
</template>

<script>
import warnInit from '../../utils/warn'
import makeCancelable from '../../utils/makeCancelable'
import { bviewPrefix as b } from '../../utils/macro.js'
import clickOutEl from '../../directives/click-out-el'
import { timeout } from '../../utils/timer'
import { Motion } from '../motion'
import noop from '../../utils/noop'
import Portal from './portal.vue'
import alignElement , { alignPoint } from './dom-align/index'
import {
    placements ,
    bottomLeft ,
    triggers ,
    triggerHover ,
    triggerClick ,
    triggerRightClick ,
} from './placement'
import { placementToPoints } from './helper'
import { camlizeName } from '../../utils/assist'
const name = `dropdown` ,
    componentName = camlizeName( `${b}-${name}` )
const warn = warnInit( name )
const contextMenuOffset = { x: 10 , y: 16 }
const defaultOffsetY = 4
const lazy = 200
const animDistance = 8
const defaultContainer = () => document.body

export default {
    name: componentName ,
    components: { Portal , Motion } ,
    directives: { clickOutEl } ,
    props: {
        /* @docbegin 菜单弹出位置：bottomLeft bottomCenter bottomRight topLeft topCenter topRight
            @docend */
        placement: {
            type: String ,
            default: bottomLeft ,
            validator( value ) {
                return placements.indexOf( value ) !== -1
            } ,
        } ,
        // @doc 是否禁用
        disabled: {
            type: Boolean ,
            default: false ,
        } ,
        // @doc 触发方式
        trigger: {
            type: String ,
            default: triggerHover ,
            validator( value ) {
                return triggers.indexOf( value ) !== -1
            } ,
        } ,
        // @doc 下拉根元素的类名称
        overlayClass: {
            type: String ,
            default: undefined ,
        } ,
        // @doc v-model 下拉框受控展示
        value: {
            type: Boolean ,
            default: undefined ,
        } ,
        // @doc 菜单渲染父节点，默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。
        getPopupContainer: {
            type: Function ,
            default: defaultContainer ,
        } ,
    } ,
    data() {
        let { value } = this ,
            isControlled = value !== undefined ,
            visible = isControlled ? value : false
        return {
            visible ,
            visiblePortal: visible ,
            cancelEnter: noop ,
            cancelLeave: noop ,
            anim: {
                offset: undefined ,
                opacity: 0 ,
            } ,
            $spring: { stiffness: 270 , damping: 26 , precision: 1 } ,
            transitionXY: true ,
        }
    } ,
    computed: {
        prefixCls() {
            return `${b}-${name}`
        } ,
        clsOverlay() {
            let {
                overlayClass ,
                trigger ,
                transitionXY ,
                visible ,
                prefixCls ,
            } = this
            return {
                [ `${b}-${name}-overlay` ]: true ,
                [ `${overlayClass}` ]: overlayClass ? true : false ,
                [ `${prefixCls}-open` ]: visible ,
                'ctx-menu-type': trigger === triggerRightClick ,
                'transition-disable': transitionXY ? false : true ,
            }
        } ,
        clsDropPortal() {
            return `${b}-${name}-poartal`
        } ,
        isTop() {
            let { placement } = this ,
                isTop = placement.indexOf( `top` ) >= 0
            return isTop
        } ,
        startOffset() {
            let { isTop } = this
            return isTop ? animDistance : -animDistance
        } ,
        beginAnimConfig() {
            return {
                opacity: 0 ,
                offset: this.startOffset ,
            }
        } ,
        endAnimConfig() {
            return {
                offset: 0 ,
                opacity: 1 ,
            }
        } ,
        symbolPortal() {
            return Symbol.for( `dropdown-protal` )
        } ,
        isTriggerClick() {
            let { trigger } = this
            return trigger === triggerClick
        } ,
        isTriggerHover() {
            let { trigger } = this
            return trigger === triggerHover
        } ,
        isTriggerRightClick() {
            return this.trigger === triggerRightClick
        } ,
        isControlled() {
            let { value } = this
            return value !== undefined
        } ,
    } ,
    watch: {
        value( visible , oldVisible ) {
            if ( visible !== oldVisible ) {
                if ( visible ) {
                    this._showOverlay()
                } else {
                    this._hiddenOverlay()
                }
            }
        } ,
    } ,
    mounted() {
        this.$_checkIfShow()
    } ,
    methods: {
        async _showOverlay( point ) {
            let { cancelLeave , cancelEnter: prevCancelEnter , disabled } = this
            if ( disabled ) {
                return
            }
            prevCancelEnter()
            cancelLeave()
            let { promise , cancel: cancelEnter } = makeCancelable( timeout( lazy ) )
            this.cancelEnter = cancelEnter
            try {
                await promise
                this.visiblePortal = true
                // 先dom protal生成
                await this.$nextTick()
                let { visible: prevVisible } = this
                this.visible = true
                // 计算位置
                await this.$nextTick()
                // -@doc 通知下拉框打开，dom已生成
                this._calcPopPosition( point , prevVisible )
                this.$emit( `dropdown-open` )
                // 动画开始
                this.anim = this.endAnimConfig
                this.$_motionStart()
            } catch ( e ) {
                if ( !e.isCanceled ) {
                    warn( e )
                }
            }
        } ,
        async _hiddenOverlay() {
            let { cancelEnter , cancelLeave: prevCancelLeave , disabled } = this
            if ( disabled ) {
                return
            }
            prevCancelLeave()
            cancelEnter()
            let { promise , cancel: cancelLeave } = makeCancelable( timeout( lazy ) )
            this.cancelLeave = cancelLeave
            try {
                await promise
                this.anim = this.beginAnimConfig
                this.$_motionStart()
                await this.motionPromise
                this.visible = false
                this.$_afterAnimLeave()
            } catch ( e ) {
                if ( !e.isCanceled ) {
                    warn( e )
                }
            }
        } ,
        _clickOutEl( { target } ) {
            let { isTriggerClick , isTriggerRightClick , isControlled } = this
            let canHandle =
                isTriggerClick || isTriggerRightClick || isControlled
            if ( canHandle ) {
                let {
                        $refs: { source } ,
                    } = this ,
                    contains = source !== undefined && source.contains( target ) ,
                    preventClose = contains
                if ( isControlled ) {
                    if ( preventClose ) {
                        // click dropdown menu do nothing
                        return
                    } else {
                        // @doc 点击'触发器'和'下拉框'外，触发visible = false
                        return this.$emit( `input` , false )
                    }
                } else {
                    // click belongs to inner
                    if ( preventClose ) {
                        // return
                    }
                    this._hiddenOverlay()
                }
            }
        } ,
        _clickTrigger() {
            let {
                isTriggerClick ,
                isTriggerRightClick ,
                visible ,
                isControlled ,
            } = this
            if ( isControlled ) {
                return
            }
            if ( isTriggerRightClick ) {
                this._hiddenOverlay()
                return
            }
            if ( isTriggerClick ) {
                if ( visible ) {
                    this._hiddenOverlay()
                } else {
                    this._showOverlay()
                }
            }
        } ,
        _mouseEnter() {
            let { isTriggerHover , isControlled } = this
            if ( isControlled ) {
                return
            }
            if ( isTriggerHover ) {
                this._showOverlay()
            }
        } ,
        _mouseLeave() {
            let { isTriggerHover , isControlled } = this
            if ( isControlled ) {
                return
            }
            if ( isTriggerHover ) {
                this._hiddenOverlay()
            }
        } ,
        _contextMenu( event ) {
            let { isTriggerRightClick } = this
            if ( isTriggerRightClick ) {
                event.preventDefault()
                let { pageX , pageY } = event
                this._showOverlay( { pageX , pageY } )
            }
        } ,
        $_afterAnimLeave() {
            // important 异步触发，先确认主菜单是否已关闭
            let { visible } = this
            if ( visible === false ) {
                this.visiblePortal = false
                // -@doc 不暴露，动画结束，通知外部下拉框关闭
                this.$emit( `dropdown-closed` )
            }
        } ,
        $_motionStart() {
            this.motionPromise = new Promise( r => {
                this.motionPromiseResolve = r
            } )
        } ,
        $_motionEnd() {
            let { motionPromiseResolve: r } = this
            if ( r ) {
                r()
            }
        } ,
        _calcPopPosition( mousePoint , prevVisible ) {
            let {
                    $refs: { source , target } ,
                    placement ,
                } = this ,
                isContextMenuMode = mousePoint !== undefined
            if ( isContextMenuMode ) {
                let { x , y } = contextMenuOffset
                this.transitionXY = prevVisible
                alignPoint( source , mousePoint , {
                    points: [ `tl` , `br` ] ,
                    offset: [ x , y ] ,
                    overflow: { adjustX: true , adjustY: true } ,
                } )
            } else {
                let points = placementToPoints( placement ) ,
                    [ , targetPoint ] = points ,
                    isTargetTop = targetPoint.indexOf( `t` ) >= 0 ,
                    offsetY = isTargetTop ? -defaultOffsetY : defaultOffsetY
                if ( source === undefined || target === undefined ) {
                    return warn(
                        `one of source、target get be undefined,should nerver be happened` ,
                    )
                }
                alignElement( source , target , {
                    points ,
                    offset: [ 0 , offsetY ] ,
                    overflow: { adjustX: true , adjustY: true } ,
                } )
            }
        } ,
        $_checkIfShow() {
            let { value } = this ,
                hasControlled = value !== undefined ,
                needShow = hasControlled && value === true
            this.anim = this.beginAnimConfig
            if ( needShow ) {
                this._showOverlay()
            }
        } ,
    } ,
}
</script>

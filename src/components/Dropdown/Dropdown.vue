<template>
    <span 
        ref="target"
        :class="prefixCls"
        @click="_clickTrigger"
        @mouseenter="_mouseEnter"
        @mouseleave="_mouseLeave"
        v-click-out-el="_clickOutEl"
    >
        <!-- 触发器 -->
        <slot />
        <portal
            v-if="visiblePortal"
            :class="clsDropPortal"
            :symbol="symbolPortal"
        >
            <transition
                :name="transitionName"
                @after-leave="_afterAnimLeave"
            >
                <div 
                    ref="source"
                    v-if="visible"
                    :class="clsOverlay"
                    @mouseenter="_mouseEnter"
                    @mouseleave="_mouseLeave"
                    @click="_mouseLeave"
                >
                    <!-- 下拉组件 -->
                    <slot name="overlay" />
                </div>
            </transition>
        </portal>
    </span>
</template>


<script>
import warnInit from '../../utils/warn'
import makeCancelable from '../../utils/makeCancelable'
import clickOutEl from '../../directives/click-out-el'
import { timeout } from '../../utils/timer'
import noop from '../../utils/noop'
import portal from './portal.vue'
import alignElement from './dom-align/index'
import { placements , bottomLeft , triggers , triggerHover } from './placement'
import { placementToPoints } from './helper'
const name = 'dropdown'
const warn = warnInit( name )
const defaultOffsetY = 4
const lazy = 200

export default {
    name ,
    components: { portal } ,
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
        }
    } ,
    data(){
        return {
            visible: false ,
            visiblePortal: false ,
            cancelEnter: noop ,
            cancelLeave: noop ,
        }
    } ,
    computed: {
        prefixCls(){
            return `bview-${name}`
        } ,
        clsOverlay(){
            let { overlayClass } = this ,
                clsStr = overlayClass ? overlayClass : ''
            return `bview-${name}-overlay ${clsStr}`
        } ,
        clsDropPortal(){
            return `bview-${name}-poartal`
        } ,
        transitionName(){
            let { placement } = this ,
                isTop = placement.indexOf( 'top' ) >= 0 ,
                dir = isTop ? 'top' : 'bottom'
            return `dropdown-transition-${ dir }`
        } ,
        symbolPortal(){
            return Symbol.for( 'dropdown-protal' )
        } ,
        isTriggerClick(){
            let { trigger } = this
            return trigger !== triggerHover
        } ,
    } ,
    methods: {
        async _showOverlay( event ){
            let { cancelLeave , disabled } = this
            if ( disabled ) {
                return
            }
            let { promise , cancel: cancelEnter } = makeCancelable( timeout( lazy ) )
            cancelLeave()
            this.cancelEnter = cancelEnter
            try {
                await promise
                this.visiblePortal = true
                // 先dom protal生成
                await this.$nextTick()
                this.visible = true
                // 计算位置
                await this.$nextTick()
                this._calcPopPosition()
            } catch( e ) {
                if ( !e.isCanceled ) {
                    warn( e ) 
                }
            }
        } ,
        async _hiddenOverlay(){
            let { cancelEnter , disabled } = this
            if ( disabled ) {
                return
            }
            cancelEnter()
            let { promise , cancel: cancelLeave } = makeCancelable( timeout( lazy ) )
            this.cancelLeave = cancelLeave
            try {
                await promise
                this.visible = false
            } catch( e ) {
                if ( !e.isCanceled ) {
                    warn( e ) 
                }
            }
        } ,
        _clickOutEl( { target } ){
            let { isTriggerClick } = this
            if ( isTriggerClick ) {
                let { $refs: { source } } = this ,
                    contains = source && source.contains( target ) ,
                    preventClose = source && contains
                // click belongs to innter
                if ( preventClose ) {
                    // return
                }
                this._hiddenOverlay()   
            }
        } ,
        _clickTrigger(){
            let { isTriggerClick , visible } = this
            if ( isTriggerClick ) {
                if ( visible ) {
                    this._hiddenOverlay()
                } else {
                    this._showOverlay()
                }
            }
        } ,
        _mouseEnter(){
            let { isTriggerClick } = this
            if ( !isTriggerClick ) {
                this._showOverlay()
            }
        } ,
        _mouseLeave(){
            let { isTriggerClick } = this
            if ( !isTriggerClick ) {
                this._hiddenOverlay()
            }
        } ,
        _afterAnimLeave(){
            // important 异步触发，先确认主菜单是否已关闭
            let { visible } = this
            if ( visible === false ) {
                this.visiblePortal = false
            }
        } ,
        _calcPopPosition(){
            let { $refs: { source , target } , placement } = this ,
                points = placementToPoints( placement ) ,
                [ , targetPoint ] = points ,
                isTargetTop = targetPoint.indexOf( 't' ) >= 0 ,
                offsetY = isTargetTop ? -defaultOffsetY : defaultOffsetY
            if ( source === undefined || target === undefined ) {
                return warn( `one of source、target get be undefined,should nerver be happened` )
            }
            alignElement( source , target , {
                points ,
                offset: [ 0 , offsetY ] ,
                overflow: { adjustX: true, adjustY: true } ,
            } )
        } ,
    }
}
</script>

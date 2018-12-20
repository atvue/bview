<template>
    <span 
        ref="target"
        :class="prefixCls"
        @mouseenter="_mouseEnter"
        @mouseleave="_mouseLeave"
    >
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
                    <slot name="overlay" />
                </div>
            </transition>
        </portal>
    </span>
</template>


<script>
import warnInit from '../../utils/warn'
import makeCancelable from '../../utils/makeCancelable'
import { timeout } from '../../utils/timer'
import noop from '../../utils/noop'
import portal from './portal.vue'
import alignElement from './dom-align/index'
import { bottomLeft } from './placement'
import { placementToPoints } from './helper'
const name = 'dropdown'
const warn = warnInit( name )
const defaultOffsetY = 4
const lazy = 200

export default {
    name ,
    components: { portal } ,
    props: {
        placement: {
            type: String ,
            default: bottomLeft ,
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
            return `bview-${name}-overlay`
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
        }
    } ,
    methods: {
        async _mouseEnter( event ){
            let { cancelLeave } = this ,
                { promise , cancel: cancelEnter } = makeCancelable( timeout( lazy ) )
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
        async _mouseLeave(){
            let { cancelEnter } = this
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
        _afterAnimLeave(){
            // important 异步触发，先确认是否主菜单是否已关闭
            if ( this.visible === false ) {
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

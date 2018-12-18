<template>
    <span 
        ref="trigger"
        :class="prefixCls"
        @mouseenter="_mouseEnter"
        @mouseleave="_mouseLeave"
    >
        <slot />
        <portal
            :class="clsDropPortal"
        >
            <transition
                name="dropdown-transition"
            >
                <div 
                    ref="overlay"
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
const name = 'dropdown'
const warn = warnInit( name )
const lazy = 200

export default {
    name ,
    components: { portal } ,
    props: {
        placement: {
            type: String ,
            default: undefined ,
        }
    } ,
    data(){
        return {
            visible: false ,
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
        }
    } ,
    methods: {
        async _mouseEnter( event ){
            let { cancelLeave } = this ,
                { promise , cancel: cancelEnter } = makeCancelable( timeout( lazy ) )
            cancelLeave()
            this.cancelEnter = cancelEnter
            try {
                let { target } = event
                await promise
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
        _calcPopPosition(){
            let { $refs: { overlay , trigger } , placement } = this

            alignElement( overlay , trigger , {
                points: [ 'tc', 'bc'] ,
                offset: [ 0 , 6 ] ,
                overflow: { adjustX: true, adjustY: true } ,
            } )
        }
    }
}
</script>

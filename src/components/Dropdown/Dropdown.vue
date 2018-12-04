<atemplate>
    <span :class="prefixCls">
        <slot></slot>
        <div 
            v-if="visible"
            :class="clsOverlay"
            v-dom-portal
        >
            <slot name="overlay" />
        </div>
    </span>
</atemplate>


<script>
import domPortal from '../../directives/dom-portal'
import warnInit from '../../utils/warn'
const name = 'dropdown'
const warn = warnInit( name )
const placement = {
    bottomLeft: 'bottomLeft'
}

export default {
    name ,
    directives: { domPortal } ,
    props: {
        placement: {
            type: String ,
            default: placement.bottomLeft ,
        }
    } ,
    data(){
        return {
            visible: true ,
        }
    } ,
    computed: {
        prefixCls(){
            return `bview-${name}`
        } ,
        clsOverlay(){
            return `bview-${name}-overlay`
        }
    } ,
    methods: {
        bindEvent(){
            let { $slots: { default: defaultNodes } } = this ,
                validEl = defaultNodes.find( () => {} )
            // console.log( defaultNodes )
        } ,
        mouseEnter(){
            this.visible = true
        } ,
        mouseLeave(){
            this.visible = false
        }
    } ,
    render( h ){
        let { $slots: { default: defaultNodes , overlay } , prefixCls
             , clsOverlay , visible } = this ,
            hasDefaultSlots = defaultNodes !== undefined ,
            hasOverlay = overlay !== undefined
        if ( !hasDefaultSlots ) {
            throw new Error( `${name}必须包裹一个元素`  )
        }
        if ( !hasOverlay || visible === false ) {
            overlay = []
        }
        let overlayEl = h( 'div' , {
                directives: [ domPortal ] ,
                'class': [ clsOverlay ] ,
            } , [ ...overlay ] )
        return h( 'span' ,
            {
                "class": [ prefixCls ] ,
                on: {
                   mouseenter: this.mouseEnter ,
                   mouseleave: this.mouseLeave ,
                }
            } ,
            [
                ...defaultNodes ,
                overlayEl ,
            ]
        )
    }
}
</script>

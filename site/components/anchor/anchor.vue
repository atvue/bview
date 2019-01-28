<template>
    <div style="width: 200px;position:fixed">
        <div :class="prefix + '-wrapper'">
            <div :class="prefix">
                <slot />
            </div>
        </div>
    </div>
</template>
<script>
import { scrollTop , off , on } from '@/utils/assist' ;
const prefix = `bui-anchor` ;
export default {
    name: `Anchor` ,
    provide() {
        return {
            anchorEle: this
        } ;
    } ,
    props: {
        isAffix: {
            type: Boolean ,
            default: true
        } ,
        container: {
            type: String ,
            default: null
        } ,
        scrollOffset: {
            type: Number ,
            default: 74
        }
    } ,
    data() {
        return {
            inkTop: 0 ,
            currentLink: `` ,
            currentId: `` ,
            prefix: prefix ,
            scrollContainer: window ,
            animating: false , // if is scrolling now
            scrollElement: document.documentElement || document.body ,
            wrapperTop: 0
        } ;
    } ,
    watch: {
        $route() {
            this._handleHashChange() ;
            this.$nextTick( () => {
                this._ScrollTo() ;
            } ) ;
        }
    } ,
    mounted() {
        this._initMethod() ;
    } ,
    destroyed() {
        this._removeListener() ;
    } ,
    methods: {
        _initMethod() {
            this._handleHashChange() ;
            this.$nextTick( () => {
                this.getContainer() ;
                this._ScrollTo() ;
                this._updateTitleOffset() ;
                this._removeListener() ;
                this._addListener() ;
            } ) ;
        } ,
        getContainer() {
            this.scrollContainer = this.container
                ? typeof this.container === `string`
                    ? document.querySelector( this.container )
                    : this.container
                : window ;
            this.scrollElement = this.container
                ? this.scrollContainer
                : document.documentElement || document.body ;
        } ,
        _handleHashChange() {
            let url = window.location.href ;
            let linkMatch = /#([^#/]+)$/.exec( url ) ;
            if ( !linkMatch ) return ;
            this.currentLink = linkMatch[ 0 ] ;
            this.currentId = linkMatch[ 1 ] ;
        } ,
        _handleScroll( e ) {
            let scrollTop =
                document.documentElement.scrollTop ||
                e.target.pageYOffset ||
                document.body.scrollTop + this.scrollOffset ;
            this._updateTitleOffset( scrollTop ) ;
        } ,
        _updateTitleOffset( scrollTop ) {
            let titleEle = this.$children.map( item => {
                let link = item.href.split( `#` )[ 1 ] ;
                let titleId = document.getElementById( link ) ;
                return titleId ;
            } ) ;
            if ( this.animating ) {
                return ;
            }
            for ( let i = 0 ;i < titleEle.length ;i++ ) {
                let currentTop = titleEle[ i ].offsetTop ;
                let nextTop = titleEle[ i + 1 ] && titleEle[ i + 1 ].offsetTop ;
                if (
                    scrollTop > currentTop &&
                    scrollTop < ( nextTop || Infinity )
                ) {
                    this.currentLink = `#` + titleEle[ i ].id ;
                    this.currentId = titleEle[ i ].id ;
                    break ;
                }
            }
        } ,
        _ScrollTo() {
            let anchor = document.getElementById( this.currentId ) ;
            if ( !anchor ) {
                return ;
            }
            let scrolllink = document.querySelector(
                `a[href="${this.currentLink}"]`
            ) ;
            let offset = scrolllink
                ? scrolllink.getAttribute( `data-scroll-offset` )
                : 0 ;
            let offsetTop =
                anchor.offsetTop - this.wrapperTop - offset - this.scrollOffset ;
            this.animating = true ;
            scrollTop(
                this.scrollContainer ,
                this.scrollElement.scrollTop ,
                offsetTop ,
                600 ,
                () => {
                    this.animating = false ;
                }
            ) ;
        } ,
        _removeListener() {
            off( this.scrollContainer , `scroll` , this._handleScroll ) ;
            off( window , `hashchange` , this._handleHashChange ) ;
        } ,
        _addListener() {
            on( window , `hashchange` , this._handleHashChange ) ;
            on( this.scrollContainer , `scroll` , this._handleScroll ) ;
        } ,
        clearCurrentLink() {
            this.currentLink = `` ;
            this.currentId = `` ;
        }
    }
} ;
</script>
<style lang="less">
@import './style/index';
</style>

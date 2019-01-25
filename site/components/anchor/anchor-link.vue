<template>
    <div :class="anchorLinkCss">
        <a
            :href="href"
            :class="prefix + '-title'"
            :data-href="href"
            :data-scroll-offset="scrollOffset"
            @click.prevent="_goAnchor"
        >
            {{ title }}
        </a>
        <slot />
    </div>
</template>
<script>
export default {
    name: `AnchorLink` ,
    inject: [ `anchorEle` ] ,
    props: {
        href: {
            type: String ,
            default: ``
        } ,
        title: {
            type: String ,
            default: ``
        } ,
        scrollOffset: {
            type: Number ,
            default: 10
        }
    } ,
    data() {
        return {
            prefix: `bui-anchor-link`
        };
    } ,
    computed: {
        anchorLinkCss() {
            return [
                this.prefix ,
                this.anchorEle.currentLink === this.href
                    ? `${this.prefix}` + `-active`
                    : ``
            ];
        }
    } ,
    methods: {
        _goAnchor() {
            this.anchorEle.currentLink = this.href;
            this.anchorEle._handleHashChange();
            this.anchorEle._ScrollTo();
            const isRoute = this.$router;
            if ( isRoute ) {
                this.$router.push( this.href );
            } else {
                window.location.href = this.href;
            }
        }
    }
};
</script>

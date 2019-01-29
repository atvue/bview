// iconfont 放在 阿里妈妈图标库中 // svg 在 src/icons/svgicons 目录下
<template>
    <i
        :class="className"
        :style="styles"
        @click="_onClick"
    >
        <template v-if="svg !== undefined">
            <Render :render="svg" />
        </template>
    </i>
</template>

<script>
let Render = {
    name: `Render` ,
    functional: true ,
    props: {
        render: Function ,
        color: {
            type: String ,
            default: undefined
        }
    } ,
    render: ( h , ctx ) => {
        return ctx.props.render( h , { _c: h } )
    }
}

export default {
    name: `Icon` ,
    components: { Render } ,
    props: {
        // @doc 使用inline svg图标，优先级高
        svg: { type: Function , default: undefined } ,
        // @doc 使用字体图标
        type: { type: String , default: undefined } ,
        // @doc 指定图标颜色
        color: { type: String , default: undefined } ,
        // @doc 指定图标字体大小
        size: { type: Number , default: undefined }
    } ,
    computed: {
        className() {
            let { type , svg } = this
            return [
                type !== undefined ? `bview-iconfont bicon-${type}` : `` ,
                svg !== undefined ? `bview-icon_svg` : ``
            ]
        } ,
        styles() {
            let style = {} ,
                { size , color } = this

            if ( size !== undefined ) {
                style[ `font-size` ] = `${this.size}px`
            }

            if ( color !== undefined ) {
                style.color = this.color
            }

            return style
        }
    } ,
    created() {
        let { type , svg } = this
        if ( type === undefined && svg === undefined ) {
            throw `icon组件必须制定svg渲染函数或iconfont type参数！`
        }
    } ,
    methods: {
        _onClick( event ) {
            // @doc 点击事件
            this.$emit( `click` , event )
        }
    }
}
</script>

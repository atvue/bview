// table 使用的render-cell
export default {
    name: `RenderCell` ,
    functional: true ,
    props: {
        row: Object ,
        render: Function ,
        index: Number ,
        col: {
            type: Object ,
            default: null ,
        } ,
    } ,
    render: ( h , ctx ) => {
        const params = {
            data: ctx.props.row ,
            index: ctx.props.index ,
        }
        if ( ctx.props.col ) {
            params.col = ctx.props.col
            params.text = ctx.props.row[ ctx.props.col.key ] || ``
        }
        params.ctx = ctx
        return ctx.props.render( h , params )
    } ,
}

export default {
    functional: true ,
    render( h , ctx ) {
        let { list } = ctx.props ,
            hasList = list !== undefined
        return hasList ? [ ...list ] : undefined
    }
}



exports.parse = content => {
    return new Promise( ( r , j ) => {
        if ( content === undefined || content === null || content.trim() === '' ) {
            return j( new Error( '解析的vue文件内容不能为空' ) )
        }
        r( content )
    } )
}
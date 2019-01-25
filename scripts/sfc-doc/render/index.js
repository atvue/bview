const table = require( `markdown-table` );

function renderTable( heads , keys , data ) {
    let res = data.map( d => {
        let row = [];
        keys.forEach( key => {
            let value = d[ key ] ,
                noValue = value === undefined || value === `undefined` ,
                v = noValue ? `/` : value;
            if ( key === `required` ) {
                let required = value === true;
                v = required ? `必填` : `不必填`;
            }
            // mark-it插件bug临时方案,url编码方式 更多: https://github.com/arve0/markdown-it-attrs/issues/80
            v = v.replace( /{|}/g , str => {
                return encodeURI( str );
            } );
            row.push( v );
        } );
        return row;
    } );
    res.unshift( heads );
    // debugger;
    return res;
}

function render( type , data ) {
    switch ( type ) {
    case `propsRes`:
        return renderTable(
            [ `属性名` , `描述` , `类型` , `是否必填` , `默认` ] ,
            [ `name` , `describe` , `type` , `required` , `default` ] ,
            data
        );
    case `apiMethods`:
        return renderTable( [ `方法名` , `描述` ] , [ `name` , `describe` ] , data );
    case `emitEvents`:
        return renderTable( [ `事件名` , `描述` ] , [ `name` , `describe` ] , data );
    case `slotsRes`:
        return renderTable( [ `插槽名` , `描述` ] , [ `name` , `describe` ] , data );
    }
}

module.exports = parsedRes => {
    let result = {} ,
        targets = [ `propsRes` , `apiMethods` , `emitEvents` , `slotsRes` ];

    targets.forEach( key => {
        let ele = parsedRes[ key ];
        if ( ele instanceof Array && ele.length > 0 ) {
            result[ key ] = table( render( key , ele ) );
        }
    } );
    // debugger;
    return result;
};

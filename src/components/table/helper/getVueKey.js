// 找不到指定tagetKey 则返回index代替
export const getVueKeyRow = ( obj , targetKey = undefined , index ) => {
    if ( targetKey === undefined || obj[ targetKey ] === undefined ) {
        return index
    } else {
        return obj[ targetKey ]
    }
}

const DEFAULT_COL_KEY1 = `key`
const DEFAULT_COL_KEY2 = `dataKey`

export const getVueKeyCol = ( obj , index ) => {
    if (
        obj[ DEFAULT_COL_KEY1 ] === undefined ||
        obj[ DEFAULT_COL_KEY2 ] === undefined
    ) {
        return index
    } else {
        return obj[ DEFAULT_COL_KEY1 ] === undefined
            ? obj[ DEFAULT_COL_KEY1 ]
            : obj[ DEFAULT_COL_KEY2 ]
    }
}

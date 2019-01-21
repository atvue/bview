// 列数
let columsns = 1

function mapEle2MultiArrs(eles) {
    let result = [],
        size = eles.length
    if (size === 0) {
        return result
    }
    eles.forEach((ele, index) => {
        let remainder = index % columsns,
            column = result[remainder]
        if (column) {
            column.push(ele)
        } else {
            result[remainder] = [ele]
        }
    })
    return result
}


export function waterfall(eles, h) {
    let multiArrs = mapEle2MultiArrs(eles),
        child = [],
        waterVnodes
    multiArrs.forEach(columnEles => {
        let columnWrapper = h(
            'div', { "class": "water-fall-column" },
            columnEles.map(ele => h(ele))
        )
        child.push(columnWrapper)
    })
    waterVnodes = h(
        'div', { "class": "water-fall" },
        child
    )
    return waterVnodes
}
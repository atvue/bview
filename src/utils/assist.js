// Find components downward
export function findComponentsDownward (context, componentName) {
    return context.$children.reduce((components, child) => {
        if (child.$options.name === componentName) components.push(child);
        const foundChilds = findComponentsDownward(child, componentName);
        return components.concat(foundChilds);
    }, []);
}

// Find components upward
export function findComponentUpward (context, componentName, componentNames) {
    if (typeof componentName === 'string') {
        componentNames = [componentName];
    } else {
        componentNames = componentName;
    }

    let parent = context.$parent;
    let name = parent.$options.name;
    while (parent && (!name || componentNames.indexOf(name) < 0)) {
        parent = parent.$parent;
        if (parent) name = parent.$options.name;
    }
    return parent;
}

// 判断参数是否是其中之一
export function oneOf (value, validList) {
    for (let i = 0; i < validList.length; i++) {
        if (value === validList[i]) {
            return true;
        }
    }
    return false;
}

// 驼峰转连字符
const hyphenateRE = /\B([A-Z])/g;
export const hyphenate = function (str) {
    return str.replace(hyphenateRE, '-$1').toLowerCase()
}

// 连字符转驼峰
const camelizeRE = /-(\w)/g;
export const camelize = function (str) {
    return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
}

// 首字母大写
var capitalize = function ( str ) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

// 组件名称规范 https://vuejs.org/v2/style-guide/index.html#Multi-word-component-names-essential
export const camlizeName = str => capitalize( camelize( str ) )
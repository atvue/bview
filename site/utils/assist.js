// Find components downward
export function findComponentsDownward(context, componentName) {
    return context.$children.reduce((components, child) => {
        if (child.$options.name === componentName) components.push(child);
        const foundChilds = findComponentsDownward(child, componentName);
        return components.concat(foundChilds);
    }, []);
}

// Find components upward
export function findComponentUpward(context, componentName, componentNames) {
    if (typeof componentName === 'string') {
        componentNames = [componentName];
    } else {
        componentNames = componentName;
    }

    let parent = context.$parent;
    let name = parent ? parent.$options.name : undefined;
    while (parent && (!name || componentNames.indexOf(name) < 0)) {
        parent = parent.$parent;
        if (parent) name = parent.$options.name;
    }
    return parent;
}
// scrollTop animation
export function scrollTop(el, from = 0, to, duration = 500, endCallback) {
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback) {
                return window.setTimeout(callback, 1000 / 60);
            }
        );
    }
    const difference = Math.abs(from - to);
    const step = Math.ceil(difference / duration * 50);

    function scroll(start, end, step) {
        if (start === end) {
            endCallback && endCallback();
            return;
        }

        let d = (start + step > end) ? end : start + step;
        if (start > end) {
            d = (start - step < end) ? end : start - step;
        }

        if (el === window) {
            window.scrollTo(d, d);
        } else {
            el.scrollTop = d;
        }
        window.requestAnimationFrame(() => scroll(d, end, step));
    }
    scroll(from, to, step);
}

export function off(el, type, handle) {
    if (el.removeEventListener) {
        el.removeEventListener(type, handle);
    } else {
        el.detachEvent("on" + type, handle);
    }
}
export function on(el, type, handle) {
    if (el.addEventListener) {
        el.addEventListener(type, handle);
    } else {
        el.attachEventListener("on" + type, handle);
    }
}
// 判断参数是否是其中之一
export function oneOf(value, validList) {
    for (let i = 0; i < validList.length; i++) {
        if (value === validList[i]) {
            return true;
        }
    }
    return false;
}

// 驼峰转连字符
const hyphenateRE = /\B([A-Z])/g;
export const hyphenate = function(str) {
    return str.replace(hyphenateRE, '-$1').toLowerCase()
}

// 连字符转驼峰
const camelizeRE = /-(\w)/g;
export const camelize = function(str) {
    return str.replace(camelizeRE, function(_, c) { return c ? c.toUpperCase() : ''; })
}

// 首字母大写
var capitalize = function(str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
    // 辅助方法 添加className
export function addClass(el, cls) {
    if (!el) return;
    let curClass = el.className;
    const classes = (cls || '').split(' ');

    for (let i = 0, j = classes.length; i < j; i++) {
        const clsName = classes[i];
        if (!clsName) continue;

        if (el.classList) {
            el.classList.add(clsName);
        } else {
            if (!hasClass(el, clsName)) {
                curClass += ' ' + clsName;
            }
        }
    }
    if (!el.classList) {
        el.className = curClass;
    }
}
// 辅助方法 移除className
export function removeClass(el, cls) {
    if (!el || !cls) return;
    const classes = cls.split(' ');
    let curClass = ' ' + el.className + ' ';

    for (let i = 0, j = classes.length; i < j; i++) {
        const clsName = classes[i];
        if (!clsName) continue;

        if (el.classList) {
            el.classList.remove(clsName);
        } else {
            if (hasClass(el, clsName)) {
                curClass = curClass.replace(' ' + clsName + ' ', ' ');
            }
        }
    }
    if (!el.classList) {
        el.className = trim(curClass);
    }
}

// 组件名称规范 https://vuejs.org/v2/style-guide/index.html#Multi-word-component-names-essential
export const camlizeName = str => capitalize(camelize(str))
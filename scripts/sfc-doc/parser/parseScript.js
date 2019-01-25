// 解析经过pabel parser得出的js ast
// 找到 props  emit
const traverse = require('@babel/traverse').default;
const bt = require('babel-types');
const generate = require('@babel/generator').default;

const COMMENTTAG = '@doc',
    ignoreCommentReg = new RegExp(`^\\s*-${COMMENTTAG}`), // -@doc 忽略输出当前的API
    tagbeginReg = new RegExp(`^${COMMENTTAG}`),
    tagblock = new RegExp(`@docbegin[\\s\\S]*?@docend`),
    tagReg = new RegExp(`(${COMMENTTAG}(begin|end|)|\\*)`, 'g'),
    newLineReg = /\n/g;

// 获取prop 的 type
function getType(node) {
    let type = '';
    // xxx: String 形式
    if (bt.isNullLiteral(node)) {
        // `null` 匹配任何类型 https://vuejs.org/v2/guide/components-props.html#Prop-Validation
        type = 'any 任何类型';
    }
    if (bt.isIdentifier(node)) {
        // debugger;
        type = node.name;
    }
    // xxx: [Number, Array] 形式
    if (bt.isArrayExpression(node)) {
        type = generate(node).code;
    }
    return type;
}
// 获取prop 的 default
function getDefault(value) {
    // debugger;
    let res;
    // default是function形式
    if (bt.isArrowFunctionExpression(value) || bt.isFunctionExpression(value)) {
        let helpfunc = new Function(`return (${generate(value).code})`)();
        // 转化成字面量形式
        res = JSON.stringify(helpfunc());
    } else {
        // default是字面量形式
        res = generate(value).code;
    }
    return res;
}
// @docbegin.*? docend
// 获取注释
// 过滤指定tag开头的注释，并用<br/>拼接，换行符更换成<br/>
function getComment(node) {
    let { leadingComments } = node;

    if (leadingComments !== undefined && leadingComments.length > 0) {
        let tarComments = leadingComments
            .filter(({ value, type }) => {
                let trimVal = value.trim();
                if (type === 'CommentBlock') {
                    // 区块注释
                    return tagblock.test(trimVal);
                    // debugger;
                } else {
                    // 行注释
                    return tagbeginReg.test(value.trim());
                }
            })
            .map(({ value }) => {
                return value
                    .trim()
                    .replace(tagReg, '')
                    .replace(newLineReg, '<br/>')
                    .trim();
            });
        return tarComments.join('<br/>').trim();
    } else {
        return '';
    }
}

// 记录$emit
// 以事件名为key值
let emitEvents = [],
    propsRes = [],
    apiMethods = [];

module.exports = astJs => {
    emitEvents = [];
    propsRes = [];
    apiMethods = [];
    traverse(astJs, {
        ExportDefaultDeclaration(exportDefaultPath) {
            exportDefaultPath.traverse({
                Property(path) {
                    // props
                    if (path.node.key.name === 'props') {
                        let propsPath = path.get('value');
                        // debugger;
                        // let
                        propsPath.traverse({
                            Property(path) {
                                if (path.parentPath !== propsPath) {
                                    // 仅查找同级节点，parent都是props
                                    return;
                                }

                                let prop = {
                                    name: '',
                                    type: undefined,
                                    describe: '',
                                    required: false,
                                    default: undefined,
                                    validator: undefined
                                };
                                prop.name = path.node.key.name;
                                // 获取注释
                                // @NOTE 暂定为获取距离最近的一行
                                prop.describe = getComment(path.node);
                                // debugger;
                                // 判断prop的值
                                let { value } = path.node;
                                // debugger;
                                // xxx: {type: xxx ... } 形式
                                if (bt.isObjectExpression(value)) {
                                    path.traverse({
                                        Property(path) {
                                            // debugger;
                                            let { name } = path.node.key,
                                                { value } = path.node;
                                            switch (name) {
                                            case 'type':
                                                // debugger;
                                                prop.type = getType(value);
                                                break;
                                            case 'required':
                                                // debugger;
                                                prop.required = value.value;
                                                break;
                                            case 'default':
                                                prop[name] = getDefault(
                                                    value
                                                );
                                                break;
                                            case 'validator':
                                                // 仅获取注释
                                                prop[name] = getComment(
                                                    path.node
                                                );
                                                break;
                                            default:
                                                break;
                                            }
                                        }
                                    });
                                } else {
                                    // xxx: xxx 或 xxx: [xx,xxx] 形式
                                    // 仅定义了prop的类型
                                    prop.type = getType(value);
                                }

                                // 将validator合并到describe中
                                if (prop.validator !== undefined) {
                                    prop.describe = `${prop.describe} ${
                                        prop.validator
                                    }`;
                                }
                                propsRes.push(prop);
                            }
                        });
                    }
                    // methods
                    // @note 改成用jsdoc解析注释结构 生成描述、参数和返回值说明
                    if (path.node.key.name === 'methods') {
                        let { properties } = path.node.value;
                        apiMethods = properties
                            .filter(e => {
                                return /^[^(_|$_)]/.test(e.key.name);
                            })
                            .map(e => {
                                return {
                                    name: e.key.name,
                                    describe: getComment(e)
                                };
                            });
                        // debugger;
                    }
                },
                // 从expressionstatement中过滤出$emit
                CallExpression(path) {
                    // debugger;
                    if (
                        bt.isMemberExpression(path.node.callee) &&
                        path.node.callee.property.name === '$emit'
                    ) {
                        let { arguments: argts } = path.node;
                        // 第一个是事件名称，第二个是事件传参
                        let [emitName, emitArg] = argts;
                        // @NOTE 这里不能判断去重 traverse不是一个同步过程
                        // 检查emitEvents中是否存在 emitKey
                        // let exist =
                        //     emitEvents.indexOf(e => {
                        //         // console.log(e.name, emitName.value);
                        //         debugger;
                        //         return e.name === emitName.value;
                        //     }) !== -1;
                        // debugger;

                        // if (!exist) {
                        // 参数说明和事件说明都解析注释
                        let { leadingComments: comments } = path.parent,
                            hasComments = comments && comments.length > 0,
                            ignoreEmit = false;
                        if (hasComments) {
                            ignoreEmit = comments.some(({ value }) =>
                                ignoreCommentReg.test(value)
                            );
                        }
                        if (ignoreEmit) {
                            return;
                        }
                        let emit = {
                            name: emitName.value,
                            args: generate(emitArg).code, // args暂时没有用
                            describe: getComment(path.parent)
                        };
                        emitEvents.push(emit);
                        // }
                    }
                }
            });
        }
    });
    // emitEvents去重
    let deEmitEvents = [];
    emitEvents.forEach(e => {
        if (deEmitEvents.find(de => de.name === e.name) === undefined) {
            deEmitEvents.push(e);
        }
    });

    // debugger;
    return { propsRes, emitEvents: deEmitEvents, apiMethods };
};

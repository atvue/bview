// const path

const sfcDoc = require('../sfc-doc');
// console.log(sfcDoc);
const markdown = require('markdown-it');
const path = require('path');
const fse = require('fs-extra');

// loader文件的路径 读取其他文件
module.exports = function(source, map, meta) {
    const callback = this.async();
    const md = markdown({
        html: true,
        typographer: true
    });
    // 源文件解析成html
    const html = md.render(`${source}\n\n### 代码示例`);

    let { resourcePath } = this,
        { dir } = path.parse(resourcePath),
        sepDir = dir.split(path.sep),
        component = sepDir[sepDir.length - 1],
        // @TODO P0 获取当前组件目录下所有.vue文件生成api文档
        // @TODO P1 sfc文件中注释添加ignore标记 不对外暴露api
        files = fse.readdirSync(dir),
        vueSfcs = files
            .filter(f => /\.vue$/.test(f))
            .map(f => path.join(dir, f)),
        vueSfcPath = path.join(dir, `${component}.vue`),
        apiTpl = `\n\n### API说明`;
    console.log(resourcePath, vueSfcs);
    Promise.all(
        vueSfcs.map(sfc => {
            return sfcDoc(sfc);
        })
    )
        // sfcDoc(vueSfcPath)
        .then(result => {
            // .then(( {name, render: {propsRes, apiMethods, emitEvents, slotsRes}}) => {
            result.forEach(res => {
                let {
                    name,
                    render: { propsRes, apiMethods, emitEvents, slotsRes }
                } = res;
                apiTpl += `\n\n#### ${name}.vue\n\n##### props\n\n${propsRes ||
                    '无'}\n\n##### methods\n\n${apiMethods}\n\n##### emits\n\n${emitEvents ||
                    '无'}\n\n##### slots\n\n${slotsRes || '无'}\n
            `;
            });
            // apiTpl  = `\n\n### API说明\n\n##### props\n\n${propsRes ||
            //     '无'}\n\n##### methods\n\n${apiMethods}\n\n##### emits\n\n${emitEvents ||
            //     '无'}\n\n##### slots\n\n${slotsRes || '无'}\n`
            const apiHtml = md.render(apiTpl);
            let vueSfcTpl = `<template>
                    <div>
                        ${html}
                        <slot></slot>
                        ${apiHtml}
                    </div>
                </template>`;

            callback(null, vueSfcTpl, map, meta);
        })
        .catch(callback);
};

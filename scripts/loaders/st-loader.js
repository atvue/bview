const sfcDoc = require('../sfc-doc');
const {
    checkFileIsNeedIgnore
} = require('../sfc-doc/ignore')
const markdown = require('markdown-it');
const markdownItAttr = require('markdown-it-attrs');
const path = require('path');
const fse = require('fs-extra');

// loader文件的路径 读取其他文件
module.exports = function(source, map, meta) {
    const callback = this.async();
    const md = markdown({
        html: true,
        typographer: true
    }).use(markdownItAttr);
    // 源文件解析成html
    const yamlReg = /---[\s\S]*---/;
    source = source.replace(yamlReg, "");
    const html = md.render(`${source}\n\n### 代码示例{id="example"}`);

    let {
            resourcePath
        } = this, {
            dir
        } = path.parse(resourcePath),
        sepDir = dir.split(path.sep),
        component = sepDir[sepDir.length - 1],
        // @TODO P1 sfc文件中注释添加ignore标记 不对外暴露api
        files = fse.readdirSync(dir),
        vueSfcs = files
            .filter(f => /\.vue$/.test(f))
            .map(f => path.join(dir, f))
            .map(f => {
                let ingore = checkFileIsNeedIgnore(f)
                return ingore ? undefined : f
            })
            .filter(f => f !== undefined),
        vueSfcPath = path.join(dir, `${component}.vue`),
        apiTpl = `\n\n### API说明{id="api"}`;

    // 添加当前目录为依赖，变化时重新获取结果
    this.addContextDependency(dir);
    Promise.all(
        vueSfcs.map(sfc => {
            return sfcDoc(sfc);
        })
    )
        .then(result => {
            result.forEach(res => {
                let {
                    name,
                    render: {
                        propsRes,
                        apiMethods,
                        emitEvents,
                        slotsRes
                    }
                } = res;
                apiTpl += `\n\n#### ${name}.vue\n\n##### props\n\n${propsRes ||
                    '无'}\n\n##### methods\n\n${apiMethods || '无'}\n\n##### emits\n\n${emitEvents ||
                    '无'}\n\n##### slots\n\n${slotsRes || '无'}\n
            `;
            });

            const apiHtml = md.render(apiTpl);
            let vueSfcTpl = `<template>
                    <div>
                        ${html}
                        <slot></slot>
                        ${apiHtml}
                    </div>
                </template>
            `;

            callback(null, vueSfcTpl, map, meta);
        })
        .catch(callback);
};
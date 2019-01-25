const sfcDoc = require('../sfc-doc');
const { checkFileIsNeedIgnore } = require('../sfc-doc/ignore');
const markdown = require('markdown-it');
const markdownItAttr = require('markdown-it-attrs');
const mdCommonClass = require('../util/mdCommonClass');
const path = require('path');
const fse = require('fs-extra');

// loader文件的路径 读取其他文件
module.exports = function(source, map, meta) {
    const callback = this.async();
    let md = markdown({
        html: true,
        typographer: true
    }).use(markdownItAttr);

    // 配置默认class - 先覆盖 ul table 相关
    // @TODO 抽取成独立插件全局处理
    md = mdCommonClass(md);

    // 源文件解析成html
    const yamlReg = /---[\s\S]*---/;
    source = source.replace(yamlReg, '');

    let { resourcePath } = this,
        { dir } = path.parse(resourcePath),
        sepDir = dir.split(path.sep),
        component = sepDir[sepDir.length - 1],
        // @TODO P1 sfc文件中注释添加ignore标记 不对外暴露api
        files = fse.readdirSync(dir),
        vueSfcs = files
            .filter(f => /\.vue$/.test(f))
            .map(f => path.join(dir, f))
            .map(f => {
                let ingore = checkFileIsNeedIgnore(f);
                return ingore ? undefined : f;
            })
            .filter(f => f !== undefined),
        // vueSfcPath = path.join(dir, `${component}.vue`),
        apiTpl = `\n\n### API说明{id="${component}-api"}`;
    const html = md.render(
        `${source}\n\n### 代码示例{id="${component}-example"}`
    );

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
                    render: { propsRes, apiMethods, emitEvents, slotsRes }
                } = res;
                apiTpl += `\n\n#### ${name}.vue`;
                apiTpl += propsRes ? `\n\n##### props\n\n${propsRes}` : '';
                apiTpl += apiMethods
                    ? `\n\n##### methods\n\n${apiMethods}`
                    : '';
                apiTpl += emitEvents
                    ? `\n\n##### emits\n\n${emitEvents}`
                    : '' + slotsRes
                        ? `\n\n##### slots\n\n${slotsRes}\n`
                        : '';
            });

            let apiHtml = md.render(apiTpl);
            // https://github.com/arve0/markdown-it-attrs/issues/80
            apiHtml = apiHtml.replace(/%7B|%7D/g, str => {
                return decodeURI(str);
            });
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

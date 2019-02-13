const { bigCamelize } = require( `./util` )

//template文件结构
function createConfig( name ) {
    return {
        dir: name ,
        child: [
            {
                dir: `__tests__` ,
                child: [
                    {
                        file: `${name}.test.js` ,
                        temp: `testJs` ,
                    } ,
                ] ,
            } ,
            {
                dir: `demo` ,
                child: [
                    {
                        file: `basic.md` ,
                        temp: `demoTemp` ,
                    } ,
                ] ,
            } ,
            {
                dir: `style` ,
                child: [
                    {
                        file: `index.less` ,
                    } ,
                    {
                        file: `index.js` ,
                        temp: `styleIndex` ,
                    } ,
                ] ,
            } ,
            {
                file: `${name}.vue` ,
                temp: `vueTemp` ,
            } ,
            {
                file: `index.js` ,
                temp: `indexJs` ,
            } ,
            {
                file: `README.st` ,
                temp: `readmeTemp` ,
            } ,
        ] ,
    }
}

const readmeTemp = name => {
    return `
---
title: ${bigCamelize( name )}
---
### 组件名称

请在<em style="font-weight: bold;">src/components/${name}/README.st</em>中编辑

组件介绍...

### 场景说明{id="changjin"}
 
组件使用场景...
`.trim()
}

const vueTemp = name => {
    let componentName = bigCamelize( name )
    return `
<template>
    <div>${componentName}</div>
</template>

<script>
export default {
    name: \`${componentName}\` ,
    props: {
    } ,
    data () {
        return {
        }
    } ,
    methods: {
    } ,
}
</script>
`.trim()
}

const styleIndex = () => `import './index.less'`

const indexJs = name => {
    let camelizeName = bigCamelize( name )

    return `import ${camelizeName} from './${name}'

export default ${camelizeName}`
}

const testJs = name => {
    name = bigCamelize( name )

    return `
import ${name} from '../index.js'
import { mount } from '@vue/test-utils'

describe( \`${name}\` , () => {

    test( \`创建${name}成功\` , () => {
        const wrapper = mount( ${name} )
        expect( wrapper.isVueInstance() ).toBeTruthy()
    } )
})
`.trim()
}

const demoTemp = name => {
    return `
\`\`\`vue
<template>
    <div>请在<em style="font-weight: bold;">src/components/${name}/demo</em>目录下的md文件中编写&#60;${bigCamelize(
    name ,
)} /&#62;的demo</div>
</template>
<script>
export default {
    
}
</script>
\`\`\`
`
}

exports.createConfig = createConfig

exports.tp = {
    vueTemp ,
    styleIndex ,
    indexJs ,
    testJs ,
    readmeTemp ,
    demoTemp ,
}

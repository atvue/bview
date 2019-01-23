const { firstUpperCase } = require( './util' )

//template文件结构
function createConfig(name) {
    return {
        dir: name,
        child: [
            {
                dir: '__tests__',
                child: [{
                    file: `${name}.test.js`,
                    temp: 'testJs'
                }]
            },
            {
                dir: 'demo',
                child: [{
                    file: 'basic.md',
                }]
            },
            {
                dir: 'style',
                child: [
                    {
                        file: 'index.less'
                    },
                    {
                        file: 'index.js',
                        temp: 'styleIndex'
                    }
                ]
            },
            {
                file: `${name}.vue`,
                temp: 'vueTemp'
            },
            {
                file: 'index.js',
                temp: 'indexJs'

            },
            {
                file: 'README.st'
            }
        ],
    }
}

let vueTemp = name => `<template>
	<div></div>
</template>

<script>
	export default {
		name: '${name}',
		props: {

        } ,
		data () {
			return {

            }
		},
		methods: {

        } ,
	}
</script>`

let styleIndex = () => `import './index.less'`

let indexJs = name => {
    let up = firstUpperCase(name)

    return `import ${up} from './${name}'

export default ${up}`
}

let testJs = name => {
    name = firstUpperCase( name )

    return `import ${name} from '../index.js'

describe( '${name}' , () => {
    import ${name} from '../index.js'
    import { mount } from '@vue/test-utils'

    test( '创建${name}成功' , () => {
        const wrapper = mount( ${name} )
        expect( wrapper.isVueInstance() ).toBeTruthy()
    } )
})
`
}

exports.createConfig = createConfig

exports.tp = {
    vueTemp,
    styleIndex,
    indexJs,
    testJs
}
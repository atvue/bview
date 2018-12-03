/**
 * 首字母大写
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
function firstUpperCase (str) {
  return str.toLowerCase().replace(/^\S/g,function(s){return s.toUpperCase();})
}

//template文件结构
function createConfig (name) {
	return {
		dir: name,
		child: [
			{
				dir: '__tests__',
				child: [
					{
						file: `${name}.test.js`,
						temp: 'testJs'
					}
				]
			},
			{
				dir: 'demo',
				child: [
					{
						file: 'basic.md',
					}
				]
			},
			{
				dir: 'style',
				child: [
					{file: 'index.less'},
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

</template>

<script>
	export default {
		name: '${name}',
		prop: {},
		data () {
			return {}
		},
		methods: {},
	}
</script>`

let styleIndex = name => `import './index.less'`

let indexJs = name => {
	let up = firstUpperCase(name)

	return `import ${up} from './name'

export default ${up}`
}

let testJs = name => {
	let up = firstUpperCase(name)

	return `import ${up} from '../index.js'

describe('${name}', () => {

})`
}

exports.createConfig = createConfig
exports.tp = {
	vueTemp,
	styleIndex,
	indexJs,
	testJs
}



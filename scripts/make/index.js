require('babel-register')

const { fileExist, createTemp } = require('./util')
const { createConfig } = require('./config')


const path = require('path')

let   name = process.argv[2],
	  namePath = process.argv[3],
	  dirPath = process.cwd(),
	  fullPath,
	  config

if (!name) {
	console.error('[模版名称必填！具体可运行make help查看]')
	process.exit(1)
}


if (namePath) {
	dirPath = path.resolve(namePath)
	if (!fileExist(dirPath)) {
		console.error('路径错误或者不存在')
		process.exit(1)
	}
}else{
	//设置默认文件夹
	dirPath = path.resolve('', 'src/components')
}

// console.log('dirPath: ', dirPath)

fullPath = path.resolve(dirPath, name)

if (fileExist(fullPath)) {
	console.error(`该路径下存在模版名称${name}`)
	process.exit(1)
}

//将绝对路径转化为相对路径
// fullPath = path.relative(process.cwd(), fullPath)

//生成模版文件目录
config = createConfig(name)
// console.log('config: ', JSON.stringify(config, null, 1))

createTemp(dirPath, config, name)

console.info(`success  在src/components下生成${name}`)









const fs = require('fs')
const path = require('path')
const { createConfig, tp } = require('./config')

/**
 * 创建文件夹同步
 * @param  {[type]} dirpath  文件夹目录
 * @param  {[type]} dirname  文件夹名称
 * @return {[type]}         [description]
 */
function mkdir (dirname) {
  if(fs.existsSync(dirname)){
      return true;
  }else{
      if(mkdir(path.dirname(dirname))){
          fs.mkdirSync(dirname);
          return true;
      }
  }
}

/**
 * 将内容写入指定的文件
 * @param  {[type]} file    [description]
 * @param  {[type]} content [description]
 * @return {[type]}         [description]
 */
function writeFile (file, content) {
	fs.writeFileSync(file, content)
}

/**
 * 检查文件是否存在
 * @param  {[type]} file [description]
 * @return {[type]}      [description]
 */
function fileExist (path) {
	try{
        fs.accessSync(path, fs.F_OK)
    }catch(e){
        return false
    }
    return true
}

/**
 * 首字母大写
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
function firstUpperCase (str) {
  return str.toLowerCase().replace(/^\S/g,function(s){return s.toUpperCase();})
}

/**
 * 根据配置文件创建模版
 * @param  {[type]} path [description]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
function createTemp (pathname, config, name) {
	let dirname = config.dir,
		filename = config.file

	if (dirname) {
		//创建文件夹
		let dirPath = path.resolve(pathname, dirname),
			child = config.child

		try {
			mkdir(dirPath)
		}catch (err) {
			console.error(err)
			return
		}

		//遍历child
		if (child) {
			child.forEach(item => {
				createTemp(dirPath, item, name)
			})
		}
	}

	if (filename) {
		let filePath = path.resolve(pathname, filename),
			temp = config.temp,
			content = temp ? tp[temp](name) : ''

		try {
			writeFile(filePath, content)
		}catch(err){
			console.error(err)
			return
		}

		return
	}
}


exports.mkdir = mkdir
exports.writeFile = writeFile
exports.fileExist = fileExist
exports.firstUpperCase = firstUpperCase
exports.createTemp = createTemp



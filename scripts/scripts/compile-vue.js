const config = require('./config'),
    { srcDir, toLibPath, toShortPath } = config,
    { readFile, writeFile } = require('./util'),
    parseVueFile = require('./parseVueFile');

const glob = require('glob');

// 查找所有vue文件
async function findVueFiles() {
    let files = await new Promise((r, j) => {
        glob(`${srcDir}/**/*.vue`, function(er, files) {
            if (er) {
                return j(er);
            }
            return r(files);
        });
    });
    return files;
}

async function init() {
    let files;
    try {
        files = await findVueFiles();
    } catch (e) {
        throw e;
    }
    files.forEach(filePath => {
        let mirrorLibPath = toLibPath(filePath);
        readFile(filePath, async content => {
            let code;
            try {
                code = await parseVueFile(content);
            } catch (e) {
                let short = toShortPath(filePath);
                error = `文件：${short}，消息：${e}，(此文件的转译lib文件将会被跳过)`;
                console.warn(error);
                // 有错误,返回
                return;
            }
            if (code !== undefined) {
                // mirrorLibPath = mirrorLibPath.replace(/.vue/, '.js');
                let fixPath = mirrorLibPath.replace(/\.vue/, '.js');
                // console.log(fixPath);
                writeFile(fixPath, code);
            }
        });
    });
}

exports.compileVue = init;

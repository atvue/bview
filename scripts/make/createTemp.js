const path = require('path'),
    { mkdir, writeFile } = require('./util'),
    { tp } = require('./config');

function createTemp(pathname, config, name) {
    let dirname = config.dir,
        filename = config.file;

    if (dirname) {
        //创建文件夹
        let dirPath = path.resolve(pathname, dirname),
            child = config.child;

        try {
            mkdir(dirPath);
        } catch (err) {
            console.error(err);
            return;
        }

        //遍历child
        if (child) {
            child.forEach(item => {
                createTemp(dirPath, item, name);
            });
        }
    }

    if (filename) {
        let filePath = path.resolve(pathname, filename),
            temp = config.temp,
            content = temp ? tp[temp](name) : '';

        try {
            writeFile(filePath, content);
        } catch (err) {
            console.error(err);
            return;
        }

        return;
    }
}

exports.createTemp = createTemp;

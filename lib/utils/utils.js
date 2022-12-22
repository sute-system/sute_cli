
const fs = require('fs');
const path = require("path")

const ejs = require("ejs")

const compile = (template, name) => {
    const templatepath = path.resolve(__dirname, `../templates/React/${template}`)
    return new Promise((resolve, reject) => {
        ejs.renderFile(templatepath, { name }, {}, function (err, str) {
            if (err) {
                console.log(err)
                reject(err)
                return
            }
            resolve(str)
        });
    })
}

const writeToFile = (path, content) => {
    // 判断path 是否存在,如果不存在,创建对应的文件夹
    return fs.promises.writeFile(path, content)
}

module.exports = {
    compile,
    writeToFile
}
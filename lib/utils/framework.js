const fs = require("fs")

const { sassDepend ,lessDepend} = require("../config/package-envir.js")
const { promptList, stylePrompt } = require("../config/framework-envir")

const selectFrame = async () => {
    
    const inquirer = await import('inquirer')
    let answer = await inquirer.default.prompt(promptList)

    // 是否安装了sass,less环境.
    if (answer.isInstallCssExtend) {
        const styleChoose = await inquirer.default.prompt(stylePrompt)
        answer.styleChoose = styleChoose.styleChoose
    }
    return answer
}

// 修改package.json
const writePackageFile = async (InstallInfo, filePath) => {

    // 命令行美化
    const chalk = await import('chalk')

    const targetPath = `${filePath}/package.json`

    fs.readFile(targetPath, "utf8", (err, data) => {
        if (err) {
            console.log(chalk.default.red("读取配置文件失败~"))
            return
        }
        let packageJson = JSON.parse(data)

        if (InstallInfo.isInstallCssExtend) {
            // 安装scss依赖
            if (InstallInfo.styleChoose.includes('scss')) {
                Object.assign(packageJson.devDependencies, sassDepend)
            }
            // 安装less依赖
            if (InstallInfo.styleChoose.includes('less')) {
                Object.assign(packageJson.devDependencies, lessDepend)
            } 
        }
        const package = JSON.stringify(packageJson, null, 4)

        // 写入文件
        fs.writeFile(targetPath, package, 'utf-8', (err) => {
            if (err) {
                console.log(chalk.default.red("修改配置失败"))
            }
        })
    })
}

module.exports = {
    selectFrame,
    writePackageFile
}

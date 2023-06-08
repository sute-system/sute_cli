const fs = require("fs")
const path = require("path")

const { sassDepend, lessDepend, tsDepend, eslint, eslintAndTs, eslintrcTs } = require("../config/package-envir.js")
const { promptList, stylePrompt } = require("../config/framework-envir")

// 选择安装环境
const selectFrame = async () => {

    // 获取选择的要安装的依赖
    const inquirer = await import('inquirer')
    let answer = await inquirer.default.prompt(promptList)

    // 是否安装了sass,less环境.
    if (answer.isInstallCssExtend) {
        const styleChoose = await inquirer.default.prompt(stylePrompt)
        answer.styleChoose = styleChoose.styleChoose
    }
    return answer
}

// 修改配置文件
const writePackageFile = async (InstallInfo, filePath) => {

    // package.json 文件修改
    await modifyPackageJSON(InstallInfo, filePath)

    // eslintrc.json配置文件修改
    if (InstallInfo.eslint) {
        await eslintrcJSON(InstallInfo, filePath)
    }
}

// 修改package.json文件
const modifyPackageJSON = async (InstallInfo, filePath) => {

    // 命令行美化
    const chalk = await import('chalk')
    const packageJsonPath = `${filePath}/package.json`
    // 修改package.json
    fs.readFile(packageJsonPath, "utf-8", (err, data) => {
        if (err) {
            console.log(chalk.default.red("读取配置文件失败~"))
            return
        }
        let packageJson = JSON.parse(data)

        // css扩展
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
        // ts
        if (InstallInfo.isInstallTs) {
            Object.assign(packageJson.devDependencies, tsDepend)
        }

        // eslint
        if (InstallInfo.eslint) {
            if (InstallInfo.isInstallTs) {
                Object.assign(packageJson.devDependencies, eslintAndTs)
            } else {
                Object.assign(packageJson.devDependencies, eslint)
            }
        }

        const packageFile = JSON.stringify(packageJson, null, 4)
        // 写入文件
        fs.writeFile(packageJsonPath, packageFile, 'utf-8', (err) => {
            if (err) {
                console.log(chalk.default.red("修改配置失败"))
            }
        })
    })
}

// eslintrc.json配置文件设置
const eslintrcJSON = async (InstallInfo, filePath) => {

    // 获取eslint文件目录并写入该项目对应目录下.
    const eslintCliPath = path.resolve(__dirname, "../templates/eslint/.eslintrc.json")
    const eslintProjectPath = `${filePath}/.eslintrc.json`

    // 1. 复制cli 中的eslintrc文件到项目里
    // 2. 根据是否安装ts, 修改eslintrc配置-注:读取的cli的eslintrc,写入的是项目的eslintrc.json

    // 复制
    fs.copyFile(eslintCliPath, `${filePath}/.eslintrc.json`, (err) => {
        if (err) {
            console.log(err)
        }
    })

    if (InstallInfo.isInstallTs) {
        // 含有ts,我们则向里面添加ts相关配置.
        fs.readFile(eslintCliPath, "utf-8", (err, data) => {
            if (err) {
                console.log("读取eslintrc.json配置文件失败~", err)
                return
            }
            let eslintJsonData = JSON.parse(data)
            Object.assign(eslintJsonData, eslintrcTs)
            const eslintjsonFile = JSON.stringify(eslintJsonData, null, 4)
            fs.writeFile(eslintProjectPath, eslintjsonFile, "utf-8", (err) => {
                if (err) {
                    console.log("修改.eslintrc文件失败")
                }
            })
        })
    }
}
// 组件/页面添加样式文件
const addStyleFile = async (targetPathDir) => {
    const projectDir = process.cwd()
    const stylePath = `${projectDir}/package.json`
    let styleName = "index.css"
    try {
        const data = fs.readFileSync(stylePath, "utf-8");
        let packageJsonData = JSON.parse(data)
        const dependenciesData = packageJsonData.dependencies
        if ("scss-loader" in dependenciesData) {
            styleName = "index.scss";
        }
        if ("less-loader" in dependenciesData) {
            styleName = "index.less";
        }
        fs.writeFile(`${targetPathDir}/${styleName}`, "", "utf-8", (err) => {
            if (err) {
                console.log("新增样式文件失败~")
            }
        })
    } catch (err) {
        console.log("读取package.json配置文件失败~", err)
    }
    return styleName
}




module.exports = {
    selectFrame,
    writePackageFile,
    addStyleFile
}

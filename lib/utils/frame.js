const promptList = [
    {
        type: "rawlist",
        message: "请选择框架名称",
        name: "frame",
        choices: [
            "React",
            "Vue(暂不支持)",
        ]
    },
    // {
    //     type: "confirm",
    //     message: "是否安装scss,less环境?",
    //     name: "isInstallCssExtend"
    // },
]

const stylePrompt = [
    {
        type: "checkbox",
        name: "styleChoose",
        message: "请选择是否安装scss,less环境?",
        choices: [
            {
                name: "scss"
            },
            {
                name: "less"
            },
            {
                name: "All"
            }
        ]
    }
]

const selectFrame = async () => {

    const inquirer = await import('inquirer')
    let answer = await inquirer.default.prompt(promptList)

    if (answer.isInstallCssExtend) {
        const styleChoose = await inquirer.default.prompt(stylePrompt)
        answer.styleChoose = styleChoose.styleChoose
    }
    
    return answer
}

module.exports = {
    selectFrame
}
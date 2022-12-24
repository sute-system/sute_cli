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
    {
        type: "confirm",
        message: "是否支持TS?",
        name: "isInstallTs"
    },
    {
        type: "confirm",
        message: "是否安装scss,less环境?",
        name: "isInstallCssExtend"
    },
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
        ]
    }
]

module.exports = {
    promptList,
    stylePrompt
}
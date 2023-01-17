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
        type: "confim",
        message: "是否安装ESLint?(默认安装: eslint、eslint-plugin-react、,诺为ts环境,则增加安装@typescript-eslint/eslint-plugin、@typescript-eslint/parser)",
        name: "eslint"
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
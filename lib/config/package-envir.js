
// 默认sass
const sassDepend = {
    "sass": '^1.56.1',
    "sass-loader": '^13.2.0'
}
// less
const lessDepend = {
    "less": "^4.1.3",
    "less-loader": "^11.1.0",
}
// ts
const tsDepend = {
    "@babel/preset-typescript": "^7.18.6",
    "typescript": "^4.9.3",
}

// eslint 
const eslint = {
    "eslint": "^8.32.0",
    "eslint-plugin-react": "^7.32.1",
}

const eslintAndTs = {
    "eslint": "^8.32.0",
    "eslint-plugin-react": "^7.32.1",
    "@typescript-eslint/eslint-plugin": "^5.48.2",
    "@typescript-eslint/parser": "^5.48.2",
}

//  ts 中安装eslint 的eslintrc.json 额外文件配置
const eslintrcTs = {
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
}



module.exports = {
    sassDepend,
    lessDepend,
    tsDepend,
    eslint,
    eslintAndTs,
    eslintrcTs
}
const { promisify } = require("util");
const path = require("path")
const fs = require("fs")
const { commandSpawn } = require("../utils/terminal");
const { createDirSync } = require("../utils/utils")
const { reactRepo, VueRepo } = require("../config/repo.config");
const open = require("open");
const { compile, writeToFile } = require('../utils/utils')
const { selectFrame, writePackageFile, addStyleFile } = require('../utils/framework.js')
const download = promisify(require("download-git-repo"));

//  创建项目
const createProject = async (project) => {
  // 加载动画-命令行美化
  const ora = await import('ora')

  const loading = ora.default()
  loading.color = "blue";

  // 框架选择
  const chooseFrame = await selectFrame()

  const isReactFrame = chooseFrame.frame === "React";
  const FrameRepo = isReactFrame ? reactRepo : VueRepo

  loading.start('cxw helps you create your project~')
  //   1. clone 项目
  await download(FrameRepo, project, { clone: true });

  //   2. 修改配置文件
  await writePackageFile(chooseFrame, `${project}`)

  // 3. 执行npm install
  const command = process.platform === "win32" ? "npm.cmd" : "npm";
  await commandSpawn(command, ["install"], { cwd: `./${project}` });

  //    4. 运行npm run serve
  commandSpawn(command, ["run", "dev"], { cwd: `./${project}` });

  //    5. 打开浏览器
  open("http://localhost:8080");

  loading.succeed('创建成功~')
  loading.stop()
};

// 创建组件.
const addCommponentAction = async (name, dest) => {

  // 1. 获取目标文件目录
  const targetPathDir = `${dest}/${name}`;
  // 2. 创建对应的目录地址
  createDirSync(targetPathDir)

  // 3.同步写入css,scss,less文件
  const styleName = await addStyleFile(targetPathDir)

  //  编译ejs 模块
  const result = await compile("react-component.ejs", name, styleName)

  // 写入文件.
  const targetPath = path.resolve(targetPathDir, `${name}.jsx`)
  writeToFile(targetPath, result)

}


// 创建store
const addStoreAction = async (name, dest) => {
  const result = await compile("react-store.ejs", name)
  const targetPath = path.resolve(dest, `${name}.js`)
  writeToFile(targetPath, result)
}

module.exports = {
  createProject,
  addCommponentAction,
  addStoreAction
};

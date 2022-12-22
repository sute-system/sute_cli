const { promisify } = require("util");
const path = require("path")
const { commandSpawn } = require("../utils/terminal");
const { reactRepo, VueRepo } = require("../config/repo.config");
const open = require("open");
const { compile, writeToFile } = require('../utils/utils')
const { selectFrame } = require('../utils/frame.js')
// 创建命令的行为
const download = promisify(require("download-git-repo"));
//  创建项目
const createProject = async (project) => {

  // 框架选择
  const chooseFrame = await selectFrame()

  const isReactFrame = chooseFrame.frame === "React";
  const FrameRepo = isReactFrame ? reactRepo : VueRepo

  console.log("cxw helps you create your project~");
  //   1. clone 项目
  await download(FrameRepo, project, { clone: true });

  //   2. 执行npm install
  const command = process.platform === "win32" ? "npm.cmd" : "npm";
  await commandSpawn(command, ["install"], { cwd: `./${project}` });

  //   3. 运行npm run serve
  commandSpawn(command, ["run", "dev"], { cwd: `./${project}` });

  //   4. 打开浏览器
  open("http://localhost:8080");
};
// 创建组件.
const addCommponentAction = async (name, dest) => {
  // 1. 编译ejs 模板
  const result = await compile("react-component.ejs", name)

  // 2. 写入文件的操作
  const targetPath = path.resolve(dest, `${name}.jsx`)
  console.log(targetPath)
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
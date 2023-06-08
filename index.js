#!/usr/bin/env node

const program = require("commander");
const helpOptions = require("./lib/core/help.js");
const { createCommands } = require("./lib/core/create")

// 查看版本号
program.version(require("./package.json").version);

// 帮助和可选的信息
helpOptions();

// 创建其他指令-执行对应命令
createCommands()



program.parse(program.argv);

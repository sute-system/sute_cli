const program = require("commander");

const { createProject, addCommponentAction, addStoreAction } = require("./action.js");

function createCommands() {
  program
    .command("create <projectName>")
    .description("clone a repository into a folder")
    .action(createProject);

  program
    .option('-d --dest <string>')
    .command('addCpn <name>')
    .description("add react component, 例如: cxw addcpn HelloWorld [-d src/components]")
    .action((name) => {
      addCommponentAction(name, program.opts().dest || "src/components")
    })
  program
    .option('-d --dest <string>')
    .command('addStore <store>')
    .description("add react store, 例如:cxw addStore Home[-d src/pages]")
    .action((store) => {
      addStoreAction(store, program.opts().dest || 'src/store/modules')
    })
}

module.exports = createCommands;

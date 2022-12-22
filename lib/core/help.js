const program = require('commander')

const helpOptions = ()=>{
    program.option('-w --why', 'a why cli');
    
    program.on('--help',function(){
        console.log("")
        console.log("Other:")
        console.log("  other options~");
    })
}

module.exports = helpOptions
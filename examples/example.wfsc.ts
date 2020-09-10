import { Interpreter, Parser, WFS_CONFIG } from "../src/core/WorkflowScript"


var config = new Interpreter.configuration();

config.constants['js'] = new Interpreter.constant('javascript');


config.blocks['myblock'] = new Interpreter.block(function(_wfs:WFS_CONFIG){
    console.log("My example block")
    _wfs.builtin.execAll(_wfs.entries.GetAllRaw());
}, '', []);

config.functions['myfunction'] = new Interpreter.func(function(params){
    console.log("my function: ", params)
});

config.debug = false;

var parsed = Parser.parse(__dirname + '\\..\\..\\examples\\example.wfs')

const scriptComplete = Interpreter.interpret(__dirname + '\\..\\..\\examples\\example.wfs', config)
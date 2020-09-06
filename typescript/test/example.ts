import { Interpreter, JSONConverter, Parser, WFS_CONFIG } from "../src/core/WorkflowScript"


var config = new Interpreter.configuration();

config.constants['js'] = new Interpreter.constant('javascript');

config.debug = false;

var parsed = Parser.parse('C:/Users/codem/Documents/VSCode/WorkflowScript/typescript/test/example.wfs')

//console.log(JSONConverter.convert(parsed));

const scriptComplete = Interpreter.interpret('C:/Users/codem/Documents/VSCode/WorkflowScript/typescript/test/example.wfs', config)
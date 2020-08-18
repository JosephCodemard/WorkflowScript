import { interpreter, JSONConverter, Parser } from "./WorkflowScript"


const parsed = Parser.parse('C:/Users/codem/Documents/VSCode/Languages/WorkflowScript/typescript/test/example.wfs');
const json = JSONConverter.convert(parsed);

//console.log("JSON: ", JSON.stringify(json, null, 2), "\n\n\n");


var config = new interpreter.configuration();

config.constants['js'] = new interpreter.constant('javascript');

config.functions['hello'] = new interpreter.func(function(){ console.log("hello"); }, false);
config.functions['say'] = new interpreter.func(function(message){ console.log(`I say: "${message}"`);}, true);

//const script_1 = interpreter.interpretScript(parsed); // ALTERNITIVE
const scriptComplete = interpreter.interpret('C:/Users/codem/Documents/VSCode/Languages/WorkflowScript/typescript/test/example.wfs', config)
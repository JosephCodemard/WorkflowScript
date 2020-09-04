import { interpreter, JSONConverter, Parser, WFS_CONFIG } from "./core/WorkflowScript"


var config = new interpreter.configuration();

config.constants['js'] = new interpreter.constant('javascript');

config.debug = false;

const scriptComplete = interpreter.interpret('C:/Users/codem/Documents/VSCode/WorkflowScript/typescript/test/example.wfs', config)
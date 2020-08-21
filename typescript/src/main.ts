import { interpreter, JSONConverter, Parser, WFS_CONFIG } from "./WorkflowScript"


var config = new interpreter.configuration();

config.constants['js'] = new interpreter.constant('javascript');


const scriptComplete = interpreter.interpret('C:/Users/codem/Documents/VSCode/Languages/WorkflowScript/typescript/test/example.wfs', config)
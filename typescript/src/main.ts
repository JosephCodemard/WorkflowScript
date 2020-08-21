import { interpreter, JSONConverter, Parser } from "./WorkflowScript"


var config = new interpreter.configuration();

config.constants['js'] = new interpreter.constant('javascript');

config.properties['loops'] = new interpreter.property();

config.blocks['loop'] = new interpreter.block(function(wfs){

    wfs.entries.GetRaw().forEach(e => {
        wfs.builtin.exec(e);
    });

}, "", [
    {name: "loops"}
]);

const scriptComplete = interpreter.interpret('C:/Users/codem/Documents/VSCode/Languages/WorkflowScript/typescript/test/example.wfs', config)
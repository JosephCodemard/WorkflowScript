import { interpreter, JSONConverter, Parser, WFS_CONFIG } from "./WorkflowScript"


var config = new interpreter.configuration();

config.constants['js'] = new interpreter.constant('javascript');

config.properties['loops'] = new interpreter.property();

config.blocks['loop'] = new interpreter.block(function(wfs:WFS_CONFIG){

    for(let i = 0; i < parseInt(wfs.entries.Get("loops").value); i ++){
        wfs.entries.GetAllRaw().forEach(e => {
            wfs.builtin.exec(e);
        });
    }

}, "", [
    {name: "loops"}
]);

const scriptComplete = interpreter.interpret('C:/Users/codem/Documents/VSCode/Languages/WorkflowScript/typescript/test/example.wfs', config)
// IMPORTS

import { WFS_ERROR, ERRORCODES, ERRORTYPES } from "../error/error"

import { wfs } from "./wfs"
import { InterpretLine } from "../parser/parser";
import { Program } from "./program";
import { ArrContainsArr, GetElements } from "./utils"



// Wants to eat GetElements()[]...  IT WILL BE A BLOCK !!!
export function ExecuteBlock(lines:InterpretLine[], prog:Program){
    
    prog.log("EB lines: ", lines)

    const allLines = lines;//prog.lines;
    const blockName = allLines.shift()    // remove the first item as that is the block ...


    const line = blockName;//allLines[i];

        // loop through all the avalible blocks
    for(let k = 0; k < prog.blockStack.GetAll().length; k++){
        const b = prog.blockStack.GetAll()[k];
                
            // check if block names are the same
        if(b.name == line.parsed[line.parsed.length - 1]){
        
                // ['package', 'run'] => 'package.run'
            var _str:string;
            for (let e = 0; e < line.parsed.length; e++) {
                _str += (line.parsed[e] + ".");                           
            }
                    
                // check if chosen block is valid
            if(_str.includes(b.path)){
        
                const elements = GetElements(prog.lines, blockName.lineindex, prog);
                
                
                if(ArrContainsArr(elements,b.properties)){

                    const _wfs = new wfs(prog, elements);
                    b.func(_wfs);

                }else{
                    var temp_str:string = "";
                    b.properties.forEach(e => (temp_str += e.name));
        
                    throw new WFS_ERROR(ERRORCODES.FATAL, ERRORTYPES.INVALID_SYNTAX, `Block "${b.name}" does not have properties: ${temp_str}`)
                }
            }
        }

    }
}
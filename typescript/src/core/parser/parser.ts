// IMPORTS
import { ReadInperpreterInput } from "../language-setup/interpreterfuncs"
import { InterpretLine, ParsedLine } from "./interfaces"
import { strip, toTupple, ToLineData } from "./utils"


function parse (file:any): Array<InterpretLine>{

    file = ReadInperpreterInput(file);

    const str:string = strip(file);

    const tupples:Array<ParsedLine> = toTupple(str);

    var arrayPointer:Array<ParsedLine> = [];

    var interpretLines: Array<InterpretLine> = [];

    for (let i = 0; i < tupples.length; i++) {
        
        if(tupples[i].content.split(" ")[0] === '-'){   // starts in '-'

            if(tupples[i].indentation < arrayPointer[arrayPointer.length - 1].indentation || tupples[i].indentation === arrayPointer[arrayPointer.length - 1].indentation){
                for (let k = 0; k < ( arrayPointer[arrayPointer.length - 1].indentation - tupples[i].indentation ) + 1; k++) {
                    arrayPointer.pop(); 
                }
            }

            const ap_str: string[] = []
            for (let k = 0; k < arrayPointer.length; k++) { ap_str.push(arrayPointer[k].content); }

            interpretLines.push({
                parsed: ap_str,
                line: ToLineData(tupples[i].content, false),
                lineindex: i
            });


        }else{  // ends in ':'
           
            if(arrayPointer.length == 0 || tupples[i].indentation > arrayPointer[arrayPointer.length - 1].indentation ){
                tupples[i].content = tupples[i].content.replace(/[^A-Za-z0-9]/g, "");

                arrayPointer.push(tupples[i]);

            }else if(tupples[i].indentation < arrayPointer[arrayPointer.length - 1].indentation){
                
                for (let k = 0; k < ( arrayPointer[arrayPointer.length - 1].indentation - tupples[i].indentation ) + 1; k++) {
                    arrayPointer.pop(); 
                }

            }else{
                tupples[i].content = tupples[i].content.replace(/[^A-Za-z0-9]/g, "");
                arrayPointer[arrayPointer.length - 1] = tupples[i]
            }


            const ap_str: string[] = []
            for (let k = 0; k < arrayPointer.length; k++) {
                ap_str.push(arrayPointer[k].content); 
            }

            interpretLines.push({
                parsed: ap_str,
                line: ToLineData(tupples[i].content, true),
                lineindex: i
            });
        }      
        
    }

    return interpretLines;
}

export { parse, InterpretLine }
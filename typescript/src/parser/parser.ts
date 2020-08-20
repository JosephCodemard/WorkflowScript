import { ReadInperpreterInput, WorkflowScript } from "../language-setup/interpreterfuncs"
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

            const ap_str: string[] = []
            for (let k = 0; k < arrayPointer.length; k++) { ap_str.push(arrayPointer[k].content); }

            interpretLines.push({
                parsed: ap_str,
                line: ToLineData(tupples[i].content, false)
            });


        }else{  // ends in ':'
           
            if(arrayPointer.length == 0 || tupples[i].indentation > arrayPointer[arrayPointer.length - 1].indentation ){

                tupples[i].content = tupples[i].content.replace(/[^A-Za-z0-9]/g, "");

                arrayPointer.push(tupples[i]);

            }else if(tupples[i].indentation < arrayPointer[arrayPointer.length - 1].indentation){
                for (let k = arrayPointer.length - 1; k > 0; k--) {
                    if(arrayPointer[k].indentation == tupples[i].indentation){
                        arrayPointer.splice(arrayPointer.length - k, 1);
                        break;
                    }                    
                }

            }else{
                tupples[i].content = tupples[i].content.replace(/[^A-Za-z0-9]/g, "");
                arrayPointer[arrayPointer.length - 1] = tupples[i]
            }


            const ap_str: string[] = []
            for (let k = 0; k < arrayPointer.length; k++) { ap_str.push(arrayPointer[k].content); }

            interpretLines.push({
                parsed: ap_str,
                line: ToLineData(tupples[i].content, true)
            });
        }           
    }

    return interpretLines;
}

export { parse, InterpretLine }
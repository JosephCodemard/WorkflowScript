import { Program } from "./program"
import { InterpretLine } from "../parser/parser";
import { ExecuteBlock } from "./execblock"
import { GetElements } from "./utils";

function RemoveLastElement(arr:any[]){
    var tmp = [...arr];
    tmp.pop()
    return tmp;
}

function ArrayCompare(arr1:any[], arr2:any[]){
    return JSON.stringify(arr1) == JSON.stringify(arr2)
}

export class Executor{

    public program:Program;

    constructor(prog:Program){
        this.program = prog;
    }

    ExecuteSubProgram(lines:InterpretLine[]){
    
        this.program.log("[INFO] line.length: ", lines.length)

        var firstBlock:string[] = undefined;

        for (let i = 0; i < lines.length; i++) {

            // If it is a line use EXECUTEBLOCK
            if( lines[i].line.block ){

                // check if the indentation is the same so that sub-blocks are not executes here...
                if(firstBlock === undefined){
                    firstBlock = RemoveLastElement(lines[i].parsed);
                }

                if(ArrayCompare(RemoveLastElement(lines[i].parsed), firstBlock)){

                    var linesToExecute = [lines[i]]
                    linesToExecute.push(...GetElements(lines, i, this.program));
            
                    // lines is used when you don't want the whole program to be executed
                    ExecuteBlock( linesToExecute, this.program );
                }
            }        
        }
    }
}
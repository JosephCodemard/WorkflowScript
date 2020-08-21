import { TYPES } from "../interpreter/types/types"

import { FuncStack } from "./types/functions";
import { VarStack } from "./types/variables";
import { PropertyStack, Property } from "./types/properties";
import { BlockStack } from "./types/blocks";

import { WFS_ERROR, ERRORCODES, ERRORTYPES } from "../error/error"
import * as bultin_err from "../error/error_bultin";

import { wfs } from "./wfs"
import { InterpretLine } from "../parser/parser";


export class Executor{

    private funcstack: FuncStack;
    private varstack: VarStack;
    private blockstack: BlockStack;
    private propertystack: PropertyStack;


    constructor(funcstack: FuncStack, varstack: VarStack, blockstack: BlockStack, propstack: PropertyStack){
        this.funcstack = funcstack;
        this.varstack = varstack;
        this.blockstack = blockstack;
        this.propertystack = propstack;
    }


    ExecuteProgram(program:Array<InterpretLine>){

        console.log("[STARTING...]")

        for(var i = 0; i < program.length; i++){

            const line = program[i];

            if(line.line.block){ // is a block
                for(let k = 0; k < this.blockstack.Get().length; k++){
                    const b = this.blockstack.Get()[k];
                    
                    if(b.name == line.parsed[line.parsed.length - 1]){

                        var _str:string;
                        for (let e = 0; e < line.parsed.length; e++) {
                            _str += (line.parsed[e] + ".");                           
                        }
                        
                        console.log(" * found: ", b)
                        console.log("   - line.parsed.includes(b.path): ", _str.includes(b.path))
                        console.log("   - parsed: ", line.parsed);
                        console.log("\n   - IN LOOP:")

                        if(_str.includes(b.path)){

                            const path = line.parsed;
                            var elements:Array<InterpretLine> = []

                            for (let j = i; j < program.length; j++) {// loop through rest of the program

                                var found = false;

                                if(!program[j].line.block){
                                    for(let f = 0; f < path.length; f++){ // loop over elements in array
                                        if(!(program[j].parsed[f] === path[f])){
                                            console.log("       - ENDING: ", f)
                                            found = true;
                                            break;
                                        }
                                    }

                                    if ( found ) { break; }

                                    elements.push(program[j]);
                                }
                            }

                            console.log("   - elements: ", elements)

                            const ArrContainsArr = (arr:InterpretLine[], target:Property[]) => {

                                if(target.length > 0){
                                    var _arr:string[] = [];
                                    var _tar:string[] = [];
                                    arr.every(e => (_arr.push(e.line.name)));
                                    target.every(e => (_tar.push(e.name)));
                                    return _tar.every(v => _arr.includes(v));
                                }
                                return true;
                            };


                            if(ArrContainsArr(elements,b.properties)){
                                console.log("   - executing...")
                                const _wfs = new wfs(this.varstack, this.funcstack, this.propertystack, elements);
                                console.log("b: ", b);
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


            if( !line.line.block ){

                


                // if(line.parsed.includes("define")){
                //     line.line.value = line.line.value.replace(/["']/g,"");
                //     this.varStack.Add({name: line.line.name, value: line.line.value, define: line.parsed, type: TYPES.USER_DEFINED});
                // }
                // else if(line.parsed.includes("run")){
                //     this.executor.executeLine(line);
                // }
            }
        }

    }

}
import { parse, InterpretLine } from "../parser/parser"
import { WFS_ERROR, ERRORTYPES, ERRORCODES } from "../error";
import * as fun from "../language-setup/interpreterfuncs";
import { VarStack, Variable } from "./types/variables";
import { FuncStack, Func } from "./types/functions";
import { Executor } from "./exec"
import { log_func, exec_func } from "./builtin"
import { configuration } from "../language-setup/interpreterfuncs"
import { BlockStack } from "./types/blocks";
import { TYPES } from "./types/types"
import { PropertyStack } from "./types/properties";

const PredefinedFunctions:Func[] = [
    exec_func,
    log_func
]


export class Interpreter{

    public varStack = new VarStack();
    public funcStack = new FuncStack(PredefinedFunctions);
    public blockStack = new BlockStack();
    public propertyStack = new PropertyStack();

    public executor = new Executor(this.funcStack, this.varStack, this.blockStack);

    public lines:Array<InterpretLine>;

    constructor(interpretLines:Array<InterpretLine>, config: configuration){
        this.lines = interpretLines;

        for(var key in config.properties){
            this.propertyStack.Add({
                name: key,
                type: TYPES.CONFIG_DEFINED
            });
        }

      
        for (const key in config.constants) {
            this.varStack.Add({
                name: key,
                value: config.constants[key].value,
                type: TYPES.CONFIG_DEFINED
            });
        }

        for (const key in config.functions) {
            this.funcStack.Add({
                name: key,
                func: config.functions[key].func,
                type: TYPES.CONFIG_DEFINED,
                expectvar: config.functions[key].expectvar
            });
        }

        for (const key in config.blocks) {
            this.blockStack.Add({
                name: key,
                func: config.blocks[key].func,
                type: TYPES.CONFIG_DEFINED,
            });
        }
    }

    interpret(){
        this.lines.forEach(line => {
            if( !line.line.block ){
                //console.log(line);

                if(line.parsed.includes("define")){
                    line.line.value = line.line.value.replace(/["']/g,"");
                    this.varStack.Add({name: line.line.name, value: line.line.value, define: line.parsed, type: TYPES.USER_DEFINED});
                }
                else if(line.parsed.includes("run")){
                    this.executor.executeLine(line);
                }
            }
        });

        console.log("\n\n\n\n");
        this.varStack.log();
        this.funcStack.log();
    }

}
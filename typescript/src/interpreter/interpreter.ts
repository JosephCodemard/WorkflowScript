import { parse, InterpretLine } from "../parser/parser"
import { WFS_ERROR, ERRORTYPES, ERRORCODES } from "../error";
import * as fun from "../language-setup/interpreterfuncs";
import { VarStack, Variable, VARTYPES } from "./variables";
import { FuncStack, Func, FUNCTYPES } from "./functions";
import { exec_func, log_func, Executor } from "./exec"
import { configuration } from "../language-setup/interpreterfuncs"

const PredefinedFunctions:Func[] = [
    exec_func,
    log_func
]


export class Interpreter{

    public varStack = new VarStack();
    public funcStack = new FuncStack(PredefinedFunctions);

    public executor = new Executor(this.funcStack, this.varStack);

    public lines:Array<InterpretLine>;

    constructor(interpretLines:Array<InterpretLine>, config: configuration){
        this.lines = interpretLines;
        
        for (var key in config.constants) {
            this.varStack.AddVars({
                name: key,
                value: config.constants[key].value,
                type: VARTYPES.CONFIG_DEFINED
            })
        }

        for (const key in config.functions) {
            this.funcStack.AddFuncs({
                name: key,
                func: config.functions[key].func,
                type: FUNCTYPES.CONFIG_DEFINED,
                expectvar: config.functions[key].expectvar
            })
        }
    }

    interpret(){
        this.lines.forEach(line => {
            if( !line.line.block ){
                //console.log(line);

                if(line.parsed.includes("define")){
                    line.line.value = line.line.value.replace(/["']/g,"");
                    this.varStack.AddVars({name: line.line.name, value: line.line.value, define: line.parsed, type: VARTYPES.USER_DEFINED});
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
import { parse, InterpretLine } from "../parser/parser"
import { WFS_ERROR, ERRORTYPES, ERRORCODES } from "../error/error";
import * as fun from "../language-setup/interpreterfuncs";
import { VarStack, Variable } from "./types/variables";
import { FuncStack, Func } from "./types/functions";
import { Executor } from "./exec"
import { RESERVED_FUNCTIONS, RESERVED_VARIABLES, RESERVED_BLOCKS } from "../builtin/builtin"
import { configuration } from "../language-setup/interpreterfuncs"
import { BlockStack } from "./types/blocks";
import { TYPES } from "./types/types"
import { PropertyStack } from "./types/properties";

export class Interpreter{

    public varStack = new VarStack(RESERVED_VARIABLES);
    public funcStack = new FuncStack(RESERVED_FUNCTIONS);
    public blockStack = new BlockStack(RESERVED_BLOCKS);
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
                path: config.blocks[key].path,
                properties: config.blocks[key].properties
            });
        }
    }

    interpret(){

        this.executor.ExecuteProgram(this.lines);

        console.log("\n\n[COMPLETE]\n\n");
        this.varStack.log();
        this.funcStack.log();
        this.blockStack.log();
    }

}
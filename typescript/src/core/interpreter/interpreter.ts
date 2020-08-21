// IMPORTS
import { TYPES } from "./types/types"

import { VarStack } from "./types/variables";
import { FuncStack } from "./types/functions";
import { BlockStack } from "./types/blocks";
import { PropertyStack } from "./types/properties";

import { RESERVED_FUNCTIONS, RESERVED_VARIABLES, RESERVED_BLOCKS, RESERVED_PROPERTIES } from "../builtin/builtin"
import { Executor } from "./exec"

import { configuration } from "../language-setup/interpreterfuncs"
import { InterpretLine } from "../parser/parser"


export class Interpreter{

    public varStack = new VarStack(RESERVED_VARIABLES);
    public funcStack = new FuncStack(RESERVED_FUNCTIONS);
    public blockStack = new BlockStack(RESERVED_BLOCKS);
    public propertyStack = new PropertyStack(RESERVED_PROPERTIES);

    public executor = new Executor(this.funcStack, this.varStack, this.blockStack, this.propertyStack);

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

            for (const prop in config.blocks[key].properties) {
                this.propertyStack.Add({
                    name: key,
                    type: TYPES.CONFIG_DEFINED
                })
            }
        }
    }

    interpret(_log=false){

        this.executor.ExecuteProgram(this.lines);

        if( _log ) { 
            console.log("\n\n[COMPLETE]\n\n"); 

            this.varStack.log();
            this.funcStack.log();
            this.blockStack.log();
        }
    }

}
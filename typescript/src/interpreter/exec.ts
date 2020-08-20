import { TYPES } from "../interpreter/types/types"

import { FuncStack, Func } from "./types/functions";
import { InterpretLine } from "../parser/parser";
import { VarStack, Variable } from "./types/variables";

import { WFS_ERROR, ERRORCODES, ERRORTYPES } from "../error"
import { BlockStack, Block } from "./types/blocks";

export class Executor{

    public funcs: Array<Func>;
    public vars: Array<Variable>;
    public blocks: Array<Block>

    constructor(funcstack: FuncStack, varstack: VarStack, blockstack: BlockStack){
        this.funcs = funcstack.Get();
        this.vars = varstack.Get();
        this.blocks = blockstack.Get();
    }

    executeLine (line:InterpretLine) {
        var params = line.line.value.split(",");
        var name = line.line.name;

        var _FUNCTION:Function;
        var expectvar:boolean

        for (let i = 0; i < this.funcs.length; i++) {
            if(this.funcs[i].name === name){
                _FUNCTION = this.funcs[i].func;
                expectvar = this.funcs[i].expectvar
            }
        }

        if(expectvar){
            //console.log("FUNCTION expects a variable");

            for (let i = 0; i < params.length; i++) {
                for (let k = 0; k < this.vars.length; k++) {
                    if(this.vars[k].name === params[i]){
                        vval = this.vars[k].value;
                    }                    
                }

                if(vval == undefined){
                    vval == "???"
                    throw new WFS_ERROR(ERRORCODES.WARNING, ERRORTYPES.INVALID_SYNTAX, `Variable "${params[i]}" does not exist in this context`);
                }
                
                params[i] = params[i] = vval;
            }
        }else{
            for (let i = 0; i < params.length; i++) {

                const _regex = /(\$\{\{)(.*?)(\}\})/g
                const matches = params[i].match(_regex)
                if(matches){

                    for (let j = 0; j < matches.length; j++) {
                        var vname_raw = params[i].match(_regex)[0]
                        var vname = vname_raw.replace(/[(\$\{\{)(\}\}]/g, "").trim();
                        var vval = undefined

                        for (let k = 0; k < this.vars.length; k++) {
                            if(this.vars[k].name === vname){
                                vval = this.vars[k].value;
                            }                    
                        }

                        if(vval == undefined){
                            vval == "???"
                            throw new WFS_ERROR(ERRORCODES.WARNING, ERRORTYPES.INVALID_SYNTAX, `Variable "${vname}" does not exist in this context`);
                        }

                        params[i] = params[i].replace(vname_raw, vval);
                    }
                }else{
                    for (let k = 0; k < this.vars.length; k++) {
                        if(params[i] === this.vars[k].name){
                            params[i] = this.vars[k].value
                        }                
                    }  
                }          
            }
        }
        _FUNCTION(...params);
    }
}
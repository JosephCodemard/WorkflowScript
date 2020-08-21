import { TYPES } from "../interpreter/types/types"

import { FuncStack, Func } from "./types/functions";
import { InterpretLine } from "../parser/parser";
import { VarStack, Variable } from "./types/variables";

import { WFS_ERROR, ERRORCODES, ERRORTYPES } from "../error/error"
import { BlockStack, Block } from "./types/blocks";
import * as bultin_err from "../error/error_bultin";

import { EXECUTE_STATMENT } from "../builtin/blocks/exec"
import { block } from "../language-setup/interpreter";

// class given to function...

// wfs.varstack.[Add()|Get()];                  [✔️]
// wfs.funcstack.[Add()|Get()];                 [✔️]

// wfs.entries                  ## object ##
// wfs.entries.asArray()        ## array ##     

// wfs.builtin.exec()   // executes line

class wfs_entries{

    private entries:InterpretLine[] = [];

    constructor(lines:Array<InterpretLine>){
        this.entries = lines;
    }

    
    Get(){
        var obj = []

        this.entries.forEach(e => {
            if(! e.line.block){
                obj.push({
                    name: e.line.name,
                    value: e.line.value,
                    
                })
            }
        });

        return obj;
    }

    GetRaw(){
        return this.entries;
    }
}

class wfs_builtin{

    private _wfs:wfs

    constructor(wfs:wfs){
        this._wfs = wfs
    }

    exec(line:InterpretLine){
        EXECUTE_STATMENT(line, this._wfs);
    }

    execAll(lines:InterpretLine[]){
        lines.forEach(l => {
            EXECUTE_STATMENT(l, this._wfs);
        })        
    }

}

class wfs_vars{

    private varstack:VarStack

    constructor(vs:VarStack){
        this.varstack = vs;
    }

    Add(name:string, value:any){
        this.varstack.Add({
            name:name,
            value:value,
            type: TYPES.USER_DEFINED
        });
    }

    Get(){
        return this.varstack.Get();
    }

    Log(){
        this.varstack.log();
    }
}

class wfs_funcs{

    private funcstack:FuncStack

    constructor(vs:FuncStack){
        this.funcstack = vs;
    }

    Add(name:string, func:Function, expectvar:boolean = false){
        this.funcstack.Add({
            name:name,
            func:func,
            expectvar: expectvar,
            type: TYPES.CONFIG_DEFINED
        });
    }

    Get(){
        return this.funcstack.Get();
    }

    Log(){
        this.funcstack.log();
    }
}

export class wfs{

    public entries:wfs_entries;
    public builtin:wfs_builtin;

    public variables:wfs_vars;
    public functions:wfs_funcs;

    constructor(v:VarStack, f:FuncStack, lines:Array<InterpretLine>){

        this.entries = new wfs_entries(lines);
        this.builtin = new wfs_builtin(this);

        this.variables = new wfs_vars(v);
        this.functions = new wfs_funcs(f);
    }
}
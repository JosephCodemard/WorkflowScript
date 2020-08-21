// IMPORTS
import { TYPES } from "../interpreter/types/types"

import { FuncStack } from "./types/functions";
import { VarStack } from "./types/variables";
import { PropertyStack } from "./types/properties";

import { InterpretLine } from "../parser/parser";
import { EXECUTE_STATMENT } from "../builtin/blocks/exec"

import { WFS_ERROR, ERRORCODES, ERRORTYPES } from "../error/error"
import * as bultin_err from "../error/error_bultin";

class wfs_entries{

    private entries:InterpretLine[] = [];

    constructor(lines:Array<InterpretLine>){
        this.entries = lines;
    }

    GetAll(){
        var obj = []

        this.entries.forEach(e => {
            if(! e.line.block){
                obj.push({
                    name: e.line.name,
                    value: e.line.value
                });
            }
        });

        return obj;
    }

    GetAllRaw(){
        return this.entries;
    }

    Get(name:string){
        for (let i = 0; i < this.entries.length; i++) {
            if(! this.entries[i].line.block && this.entries[i].line.name == name){
                return {
                    name: this.entries[i].line.name,
                    value: this.entries[i].line.value
                }
            }            
        }
    }
    GetRaw(name:string){
        for (let i = 0; i < this.entries.length; i++) {
            if(! this.entries[i].line.block && this.entries[i].line.name == name){
                return this.entries[i]
            }            
        }
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

    GetAll(){
        return this.varstack.Get();
    }

    Get(name:string){
        for (let i = 0; i < this.varstack.Get().length; i++) {
            if(this.varstack.Get()[i].name == name){
                this.varstack.Get();
            }            
        }
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

    GetAll(){
        return this.funcstack.Get();
    }

    Get(name:string){
        for (let i = 0; i < this.funcstack.Get().length; i++) {
            if(this.funcstack.Get()[i].name == name){
                this.funcstack.Get();
            }            
        }
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
    public properties:PropertyStack;

    constructor(v:VarStack, f:FuncStack, p:PropertyStack, lines:Array<InterpretLine>){

        this.entries = new wfs_entries(lines);
        this.builtin = new wfs_builtin(this);

        this.variables = new wfs_vars(v);
        this.functions = new wfs_funcs(f);
        this.properties = p;
    }
}
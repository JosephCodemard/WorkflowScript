// IMPORTS
import { TYPES } from "../interpreter/types/types"

import { FuncStack, Func } from "./types/functions";
import { VarStack } from "./types/variables";
import { PropertyStack } from "./types/properties";

import { InterpretLine } from "../parser/parser";

import { ExecuteBlock } from "./execblock"
import { ExecuteLine, SubstituteVariables } from "./execline"
import { Program } from "./program";
import { GetElements } from "./utils";
import { FlagStack } from "./types/flags";

class wfs_entries{

    private entries:InterpretLine[] = [];
    private _wfs:wfs

    constructor(lines:Array<InterpretLine>, _wfs:wfs){
        this.entries = lines;
        this._wfs = _wfs;
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

    Get(name:string, evalVars = true){
        for (let i = 0; i < this.entries.length; i++) {
            if(! this.entries[i].line.block && this.entries[i].line.name == name){

                var _name = this.entries[i].line.name;
                var _val = this.entries[i].line.value;

                if(evalVars){ _val = SubstituteVariables( _val, this._wfs.program ); }

                return {
                    name: _name,
                    value: _val
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
        ExecuteLine(line, this._wfs.program);
    }

    execAll(lines:InterpretLine[]){
        var i = 0;
        lines.forEach(l => {
            if(!l.line.block){
                this._wfs.program.log("   - executing line: '" + l.line.name + "' at ", l.parsed);
                ExecuteLine(l, this._wfs.program);
            }else{
                this._wfs.program.log("   - executing block: '" + l.line.name + "' at ", l.parsed);
                var linesToExecute = [lines[i]]
                linesToExecute.push(...GetElements(lines, i, this._wfs.program));
                ExecuteBlock(linesToExecute, this._wfs.program)
            }
            i++;
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


    Get(name:string){
        return this.varstack.Get(name);
    }

    Set(name:string, value:string){
        this.varstack.Set({
            name:name,
            value:value,
            type: TYPES.USER_DEFINED 
        });
    }

    GetAll(){
        return this.varstack.GetAll();
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
            type: TYPES.USER_DEFINED
        });
    }


    Get(name:string){
        return this.funcstack.Get(name);
    }

    Set(name:string, func:Function, expectvar=false){
        this.funcstack.Set({
            name:name,
            func:func,
            expectvar:expectvar,
            type: TYPES.USER_DEFINED 
        });
    }

    GetAll(){
        return this.funcstack.GetAll();
    }

    Clear(){
        this.funcstack.SetAll([]);
    }

    Log(){
        this.funcstack.log();
    }
}

class wfs_flags{

    private flagstack:FlagStack

    constructor(fs:FlagStack){
        this.flagstack = fs;
    }

    Add(name:string, value:string){
        this.flagstack.Add({
            name:name,
            value:value,
            type: TYPES.USER_DEFINED
        });
    }

    Set(name:string, value:string){
        this.flagstack.Set({
            name:name, 
            value:value, 
            type:TYPES.USER_DEFINED
        });
    }

    Get(name:string){
        return this.flagstack.Get(name);
    }

    GetAll(){
        return this.flagstack.GetAll();
    }

    Clear(){
        this.flagstack.SetAll([]);
    }

    Log(){
        this.flagstack.log();
    }
}

export class wfs{

    public entries:wfs_entries;
    public builtin:wfs_builtin;

    public variables:wfs_vars;
    public functions:wfs_funcs;
    public flags:wfs_flags;

    public properties:PropertyStack;

    public program:Program;

    constructor(prog:Program, lines:Array<InterpretLine>){


        this.entries = new wfs_entries(lines, this);
        this.builtin = new wfs_builtin(this);

        this.variables = new wfs_vars(prog.varStack);
        this.functions = new wfs_funcs(prog.funcStack);
        this.flags = new wfs_flags(prog.flagStack);

        this.properties = prog.propertyStack;

        this.program = prog;
    }
}
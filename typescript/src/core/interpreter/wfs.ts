// IMPORTS
import { TYPES } from "../interpreter/types/types"

import { FuncStack, Func } from "./types/functions";
import { VarStack, Variable } from "./types/variables";
import { PropertyStack } from "./types/properties";

import { InterpretLine } from "../parser/parser";

import { ExecuteBlock } from "./execblock"
import { ExecuteLine, SubstituteVariables } from "./execline"
import { Program } from "./program";
import { GetElements } from "./utils";
import { FlagStack } from "./types/flags";

/**
    * [wfs] - entries
    * @param {InterpretLine[]} lines The entries in the block
    * @param {wfs} _wfs The wfs instance
*/
class wfs_entries{

    private entries:InterpretLine[] = [];
    private _wfs:wfs

    constructor(lines:Array<InterpretLine>, _wfs:wfs){
        this.entries = lines;
        this._wfs = _wfs;
    }

    /**
    * [wfs] - entries - GetAll
    * @returns All sanitised entries in the block
    */
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

    /**
    * [wfs] - entries - GetAllRaw
    * @returns All entries in the block
    */
    GetAllRaw(){
        return this.entries;
    }

    /**
    * [wfs] - entries - Get
    * @param {string} name The name of the entry to fetch
    * @param {boolean} evalVars Whether or not the variables will be valuated
    * @param {number} startindex The index at which to start the searchs 
    * @returns The sanitised entry that matches the paramaters
    */
    Get(name:string, evalVars = true, startindex:number = 0){
        for (let i = startindex; i < this.entries.length; i++) {
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

    /**
    * [wfs] - entries - GetRaw
    * @param {string} name The name of the entry to fetch
    * @param {number} startindex The index at which to start the searchs 
    * @returns The entry that matches the parameters
    */
    GetRaw(name:string, startindex:number = 0){
        for (let i = 0; i < this.entries.length; i++) {
            if(! this.entries[i].line.block && this.entries[i].line.name == name){
                return this.entries[i]
            }            
        }
    }
}
/**
    * [wfs] - builtin
    * @param {wfs} _wfs The wfs instance
*/
class wfs_builtin{

    private _wfs:wfs

    constructor(wfs:wfs){
        this._wfs = wfs
    }

    /**
     * [wfs] - builtin - exec
     * @param {InterpretLine} line Exectutes the line 
    */

    exec(line:InterpretLine){
        ExecuteLine(line, this._wfs.program);
    }

    /**
     * [wfs] - builtin - exec
     * @param {InterpretLine[]} lines Exectutes all the lines
    */
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
/**
    * [wfs] - variables
    * @param {VarStack} fs The varStack
*/
class wfs_vars{

    private varstack:VarStack

    /**
     * [wfs] - vars
     * @param {VarStack} vs The varStack
    */
    constructor(vs:VarStack){
        this.varstack = vs;
    }

    /**
     * [wfs] - vars - Add
     * @param {string} name The name of the value to add
     * @param {any} value The value to be associated with the variable
    */
    Add(name:string, value:any){
        this.varstack.Add({
            name:name,
            value:value,
            type: TYPES.USER_DEFINED
        });
    }

    /**
     * [wfs] - vars - Get
     * @param {string} name The name of the value to get
     * @returns {Variable} The variable that matches the parameter
    */
    Get(name:string){
        return this.varstack.Get(name);
    }

    /**
     * [wfs] - vars - Set
     * @param {string} name The name of the value to set
     * @param {string} value The value of the value to be set
    */
    Set(name:string, value:string){
        this.varstack.Set({
            name:name,
            value:value,
            type: TYPES.USER_DEFINED 
        });
    }

    /**
     * [wfs] - vars - GetAll
     * @returns {Variable[]} Returns all the variables
    */
    GetAll(){
        return this.varstack.GetAll();
    }

    /**
     * [wfs] - vars - Clear
     * @description Clears all the values
    */
   Clear(){
        this.varstack.SetAll([]);
    }

    /**
     * [wfs] - vars - Log
     * @description Logs all the variables
    */
    Log(){
        this.varstack.log();
    }
}
/**
    * [wfs] - functions
    * @param {FuncStack} fs The funcStack
*/
class wfs_funcs{

    private funcstack:FuncStack

    /**
     * [wfs] - funcs
     * @param {VarStack} vs The funcStack
    */
    constructor(vs:FuncStack){
        this.funcstack = vs;
    }

    /**
     * [wfs] - funcs - Add
     * @param {string} name The name of the value to add
     * @param {Function} func The function to be associated with the variable
     * @param {boolean} exepectVar Whether the function exepects a variable
    */
    Add(name:string, func:Function, expectvar:boolean = false){
        this.funcstack.Add({
            name:name,
            func:func,
            expectvar: expectvar,
            type: TYPES.USER_DEFINED
        });
    }

    /**
     * [wfs] - funcs - Get
     * @param {string} name The name of the value to get
     * @returns {Variable} The variable that matches the parameter
    */
    Get(name:string){
        return this.funcstack.Get(name);
    }

    /**
     * [wfs] - funcs - Set
     * @param {string} name The name of the value to set
     * @param {string} value The value of the value to be set
    */
    Set(name:string, func:Function, expectvar=false){
        this.funcstack.Set({
            name:name,
            func:func,
            expectvar:expectvar,
            type: TYPES.USER_DEFINED 
        });
    }
    /**
     * [wfs] - funcs - GetAll
     * @returns {Variable[]} Returns all the variables
    */
    GetAll(){
        return this.funcstack.GetAll();
    }

    /**
     * [wfs] - funcs - Clear
     * @description Clears all the values
    */
    Clear(){
        this.funcstack.SetAll([]);
    }
    /**
     * [wfs] - funcs - Log
     * @description Logs all the variables
    */
    Log(){
        this.funcstack.log();
    }
}

class wfs_flags{

    private flagstack:FlagStack

    /**
     * [wfs] - flags
     * @param {FlagStack} fs The flagStack
    */
    constructor(fs:FlagStack){
        this.flagstack = fs;
    }

    /**
     * [wfs] - flags - Add
     * @param {string} name The name of the value to add
     * @param {Function} func The value to be associated with the flag
    */
    Add(name:string, value:string){
        this.flagstack.Add({
            name:name,
            value:value,
            type: TYPES.USER_DEFINED
        });
    }

    /**
     * [wfs] - flags - Set
     * @param {string} name The name of the value to set
     * @param {string} value The value of the value to be set
    */
    Set(name:string, value:string){
        this.flagstack.Set({
            name:name, 
            value:value, 
            type:TYPES.USER_DEFINED
        });
    }
    /**
     * [wfs] - flags - Get
     * @param {string} name The name of the value to get
     * @returns {Variable} The variable that matches the parameter
    */
    Get(name:string){
        return this.flagstack.Get(name);
    }
    /**
     * [wfs] - flags - GetAll
     * @returns {Variable[]} Returns all the variables
    */
    GetAll(){
        return this.flagstack.GetAll();
    }
    /**
     * [wfs] - flags - Clear
     * @description Clears all the values
    */
    Clear(){
        this.flagstack.SetAll([]);
    }
    /**
     * [wfs] - flags - Log
     * @description Logs all the variables
    */
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

    /**
     * [wfs]
     * @param {Program} prog The main wfs program
     * @param {InterpretLine[]} lines The lines the wfs instance has acess to 
    */

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
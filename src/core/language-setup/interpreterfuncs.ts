// IMPORTS
import { WFS_ERROR, ERRORTYPES, ERRORCODES } from "../error/error";
import * as fs from "fs";
import { Property } from "../interpreter/types/properties";
import { TYPES } from "../interpreter/types/types";

export class configuration{
    /**
     * [interpreter] - configuration
     * @description new configuartion object
     */
    constructor(){}

    /**
     * [interpreter] - congiguration - functions
     * @description the Functions
     */
    public functions = {};
    /**
     * [interpreter] - congiguration - constants
     * @description the Constants
     */
    public constants = {};
    /**
     * [interpreter] - congiguration - blocks
     * @description the Blocks
     */
    public blocks = {};
    /**
     * [interpreter] - congiguration - properties
     * @description the Properties
     */
    public properties = {};
    /**
     * [interpreter] - congiguration - debug
     * @description Whether or not debug mode will be on
     */
    public debug:boolean = false;
}

export class constant{
    /**
     * [interpreter] - constant
     * @param {any} constant adds a new variable
     */
    constructor(constant:any){
        if(typeof constant == "number" || typeof constant == "string" || typeof constant == "boolean"){
            return {"type": (typeof constant), "value":constant};
        }
        else{
            throw new WFS_ERROR(ERRORCODES.ERROR, ERRORTYPES.INVALID_CONFIGURATION, `Invalid constant of type "${typeof constant}"in config file`);
        }
    }
}

export class func{

    /**
     * [interpreter] - constant
     * @param {Function} fun The function
     * @param {boolean} expectVar Whether or not it expects a variable
     */

    constructor(fun:Function, expectVar=false){
        return {func:fun, expectvar: expectVar};
    }
}

export class property{
    /**
     * [interpreter] - property
     */
    constructor(){}
}

export class block{

    public name:string;
    public path:string;
    public func:Function;
    public properties:Array<Property> = [];

    /**
     * 
     * @param {Function} func the function that will be run must have wfs as a parameter
     * @param {string} path The valid paths 
     * @param {any[]} properties any expected entries
     */
    constructor(func:Function|null, path:string, properties:Array<any>){
        this.path = path;
        this.func = func;

        for (let i = 0; i < properties.length; i++) {
            this.properties.push({
                name: properties[i].name,
                type: TYPES.CONFIG_DEFINED
            })   
        }

    }
}

export class WorkflowScript{
    public script:string;

    /**
     * [interpreter] - WorkflowScript
     * @param {string} script Creates a wfs from inline string
     */
    constructor(script:string){
        this.script = script;
    }
}
/**
 * ReadInterpreterInput
 * @param {any} script The file path or wfs object
 */
export function ReadInperpreterInput(script:any){
    if(typeof script == "string"){
        try{
            return fs.readFileSync(script).toString();
        }catch{
            throw new WFS_ERROR(ERRORCODES.FATAL, ERRORTYPES.INVALID_CONFIGURATION, `Invalid filename: ${script}`);
        }

    }
    else if (script instanceof WorkflowScript){
        return script.script;
    }
    else{
        throw new WFS_ERROR(ERRORCODES.FATAL, ERRORTYPES.INVALID_CONFIGURATION, `Script must be string or class WorkFlowScript`);
    }
}
import { WFS_ERROR, ERRORTYPES, ERRORCODES } from "../error";
import * as fs from "fs";


export class configuration{
    constructor(){}

    public functions = {};
    public constants = {};
    public blocks = {};
    public properties = {};
}

export class constant{
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
    constructor(fun:Function, expectVar=false){
        return {func:fun, expectvar: expectVar};
    }
}

export class property{
   constructor(){};
}

export class block{

    public name:string;
    public path:string;
    public func:Function;
    public properties:Array<Object>;

    constructor(func:Function|null, path:string, properties:Array<Object>){
        this.path = path;
        this.func = func;
        this.properties = properties;
    }
}

export class WorkflowScript{
    public script:string;
    constructor(script:string){
        this.script = script;
    }
}

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
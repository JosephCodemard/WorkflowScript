import { TYPES } from "./types"
import { RESERVED_VARIABLES } from "../builtin"

export interface Variable{
    name:string;
    value:any;
    type: TYPES,
    define?:Array<string>;
}

export class VarStack{

    public variables:Array<Variable> = RESERVED_VARIABLES;

    public Get() {
        return this.variables;
    }    

    public Add(_var:Variable){
        this.variables.push(_var);
    }

    public log(){
        console.log(this.Get());
    }
}
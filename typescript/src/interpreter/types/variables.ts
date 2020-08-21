import { TYPES } from "./types"

export interface Variable{
    name:string;
    value:any;
    type: TYPES,
    define?:Array<string>;
}

export class VarStack{

    public variables:Array<Variable>;

    constructor(v:Array<Variable> = []){
        this.variables = v;
    }

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
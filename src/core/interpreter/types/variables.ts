import { TYPES } from "./types"

export interface Variable{
    name:string;
    value:any;
    type: TYPES,
    define?:Array<string>;
}

export class VarStack{

    private variables:Array<Variable>;

    constructor(v:Array<Variable> = []){
        this.variables = v;
    }

    public Get(name:string) {
        for (let i = 0; i < this.variables.length; i++) {
            if(name == this.variables[i].name){
                return this.variables[i];
            }            
        }
    } 
    public GetAll() {
        return this.variables;
    }    

    public Add(_:Variable){
        this.variables.push(_);
    }

    public log(){
        console.log(this.GetAll());
    }

    public SetAll(_:Array<Variable>) {
        this.variables = _;
    }

    public Set(_:Variable) {
        for (let i = 0; i < this.variables.length; i++) {
            if(_.name == this.variables[i].name){
                this.variables[i] = _;
            }            
        }
    }
}
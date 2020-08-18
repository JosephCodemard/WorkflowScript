
export enum VARTYPES{
    "USER_DEFINED" = "USER_DEFINED",
    "CONFIG_DEFINED" = "CONFIG_DEFINED",
    "RESERVED" = "RESERVED"
}

const RESERVED_VARIABLES :Array<Variable> = [
    {name: "__dir__", value:__dirname, type: VARTYPES.RESERVED} // change
]

export interface Variable{
    name:string;
    value:any;//Array<string>|Array<number>|Array<boolean>|number|boolean|string;
    type: VARTYPES,
    define?:Array<string>;
}

export class VarStack{

    public variables:Array<Variable> = RESERVED_VARIABLES;

    public GetVars() {
        return this.variables;
    }    

    public AddVars(_var:Variable){
        this.variables.push(_var);
    }

    public log(){
        console.log(this.GetVars());
    }
}
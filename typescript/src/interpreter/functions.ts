export enum FUNCTYPES{
    "USER_DEFINED" = "USER_DEFINED",
    "CONFIG_DEFINED" = "CONFIG_DEFINED",
    "RESERVED" = "RESERVED"
}

export interface Func{
    name:string;
    func:Function;
    expectvar: boolean;
    type: FUNCTYPES;
    define?:Array<string>;
}


export class FuncStack{

    public functions:Array<Func> = [];

    constructor(f:Func[] = []){
        this.functions = f;
    }

    public GetFuncs() {
        return this.functions;
    }    

    public AddFuncs(_fun:Func){
        this.functions.push(_fun);
    }

    public log(){
        console.log(this.GetFuncs());
    }
}
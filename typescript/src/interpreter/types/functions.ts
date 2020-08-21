import { TYPES } from "./types"


export interface Func{
    name:string;
    func:Function;
    expectvar: boolean;
    type: TYPES;
    define?:Array<string>;
}


export class FuncStack{

    private functions:Array<Func> = [];

    constructor(f:Func[] = []){
        this.functions = f;
    }

    public Get() {
        return this.functions;
    }    

    public Add(_fun:Func){
        this.functions.push(_fun);
    }

    public log(){
        console.log(this.Get());
    }
}
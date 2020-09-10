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

    public Get(name:string) {
        for (let i = 0; i < this.functions.length; i++) {
            if(name == this.functions[i].name){
                return this.functions[i];
            }            
        }
    } 
    public GetAll() {
        return this.functions;
    }    

    public Add(_Func:Func){
        this.functions.push(_Func);
    }

    public log(){
        console.log(this.GetAll());
    }

    public SetAll(f:Array<Func>) {
        this.functions = f;
    }

    public Set(f:Func) {
        for (let i = 0; i < this.functions.length; i++) {
            if(f.name == this.functions[i].name){
                this.functions[i] = f;
            }            
        }
    }
}
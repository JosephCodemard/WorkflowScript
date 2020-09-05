import { TYPES } from "./types"
import { Property } from "./properties"


export interface Flag{
    name:string;
    value:string;
}

export class FlagStack{

    public flags:Array<Flag>;

    constructor(f:Array<Flag> = []){
        this.flags = f;
    }

    public Get() {
        return this.flags;
    }    

    public Add(_flag:Flag){
        this.flags.push(_flag);
    }

    public log(){
        console.log(this.Get());
    }
}
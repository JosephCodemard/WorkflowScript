import { TYPES } from "./types"


export interface Property{
    name:string;
}
export interface Block{
    name:string;
    func:any;
    type:TYPES,
    path:string,
    properties:Array<Property>
    define?:Array<string>;
}

export class BlockStack{

    public blocks:Array<Block>;

    constructor(b:Array<Block> = []){
        this.blocks = b;
    }

    public Get() {
        return this.blocks;
    }    

    public Add(_block:Block){
        this.blocks.push(_block);
    }

    public log(){
        console.log(this.Get());
    }
}
import { TYPES } from "./types"
import { RESERVED_BLOCKS } from "../builtin"


export interface Block{
    name:string;
    func:any;
    type: TYPES,
    define?:Array<string>;
}

export class BlockStack{

    public blocks:Array<Block> = RESERVED_BLOCKS;

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
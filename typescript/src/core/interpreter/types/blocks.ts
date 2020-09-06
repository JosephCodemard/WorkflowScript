import { TYPES } from "./types"
import { Property } from "./properties"


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

    public Get(name:string) {
        for (let i = 0; i < this.blocks.length; i++) {
            if(name == this.blocks[i].name){
                return this.blocks[i];
            }            
        }
    } 
    public GetAll() {
        return this.blocks;
    }    

    public Add(_:Block){
        this.blocks.push(_);
    }

    public log(){
        console.log(this.GetAll());
    }

    public SetAll(_:Array<Block>) {
        this.blocks = _;
    }

    public Set(_:Block) {
        for (let i = 0; i < this.blocks.length; i++) {
            if(_.name == this.blocks[i].name){
                this.blocks[i] = _;
            }            
        }
    }
}
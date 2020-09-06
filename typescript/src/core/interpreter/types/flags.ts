import { TYPES } from "./types"


export interface Flag{
    name:string;
    value:string;
    type: TYPES;
}

export class FlagStack{

    public flags:Array<Flag>;

    constructor(f:Array<Flag> = []){
        this.flags = f;
    }

    public Get(name:string) {
        for (let i = 0; i < this.flags.length; i++) {
            if(name == this.flags[i].name){
                return this.flags[i];
            }            
        }
    } 
    public GetAll() {
        return this.flags;
    }    

    public Add(_:Flag){
        this.flags.push(_);
    }

    public log(){
        console.log(this.GetAll());
    }

    public SetAll(_:Array<Flag>) {
        this.flags = _;
    }

    public Set(_:Flag) {
        for (let i = 0; i < this.flags.length; i++) {
            if(_.name == this.flags[i].name){
                this.flags[i] = _;
            }            
        }
    }
}
import { TYPES } from "./types"

export interface Property{
    name:string;
    type:TYPES;
    define?:Array<string>;
}


export class PropertyStack{

    public properties:Array<Property> = [];

    constructor(p:Property[] = []){
        this.properties = p;
    }

    public Get() {
        return this.properties;
    }    

    public Add(_prop:Property){
        this.properties.push(_prop);
    }

    public log(){
        console.log(this.Get());
    }
}
import { TYPES } from "./types"

export interface Property{
    name:string;
    type:TYPES;
    define?:Array<string>;
}


export class PropertyStack{

    private properties:Array<Property> = [];

    constructor(p:Property[] = []){
        this.properties = p;
    }

    public Get(name:string) {
        for (let i = 0; i < this.properties.length; i++) {
            if(name == this.properties[i].name){
                return this.properties[i];
            }            
        }
    } 
    public GetAll() {
        return this.properties;
    }    

    public Add(_:Property){
        this.properties.push(_);
    }

    public log(){
        console.log(this.GetAll());
    }

    public SetAll(_:Array<Property>) {
        this.properties = _;
    }

    public Set(_:Property) {
        for (let i = 0; i < this.properties.length; i++) {
            if(_.name == this.properties[i].name){
                this.properties[i] = _;
            }            
        }
    }
}
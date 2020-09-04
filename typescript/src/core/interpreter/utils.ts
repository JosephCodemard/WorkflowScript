import { InterpretLine } from "../parser/parser";
import { Property } from "./types/properties";
import { Program } from "./program";


// Simple function to check if an array conatains another array
export const ArrContainsArr = (arr:InterpretLine[], target:Property[]) => {

    if(target.length > 0){
        var _arr:string[] = [];
        var _tar:string[] = [];
        arr.every(e => (_arr.push(e.line.name)));
        target.every(e => (_tar.push(e.name)));
        return _tar.every(v => _arr.includes(v));
    }
    return true;
};





// Returns the elements in the block at index [i], [lines] is to narrow down the search
export function GetElements(lines: InterpretLine[], i:number, prog:Program){

    var path = lines[i].parsed
    var elements:Array<InterpretLine> = []

    const PathsMatch = (arr:any[], target:any[]) => {
       for (let l = 0; l < arr.length; l++) { if(arr[l] !== target[l]){ return false; } }
       return true;
    };

    for (let j = i; j < lines.length; j++) {// loop through rest of the lines

        if( !lines[j].line.block ){ // is not block

            if( PathsMatch(lines[j].parsed, [...path]) && (lines[j].parsed.length >= [...path].length) ){ // if they match
                elements.push(lines[j]);
            }

        }else{ // is a block

            let temp_proj_path = [...lines[j].parsed]
            temp_proj_path.pop();

            if( PathsMatch(temp_proj_path, [...path] ) && (lines[j].parsed.length > [...path].length)){ // if they match
                elements.push(lines[j]);
            }    
        }
    }
    return elements;
}

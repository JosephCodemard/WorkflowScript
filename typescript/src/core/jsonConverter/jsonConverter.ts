// IMPORTS
import * as _ from "lodash";
import { InterpretLine } from "../parser/parser";

export interface LineData{
    name: string;
    value: string;
}

export function convert (lines: InterpretLine[]) {  

    var __object = {};

    for (let i = 0; i < lines.length; i++) {
        if(lines[i].line.block){           
            
            _.set(__object, lines[i].parsed, {});
        }
        if(!lines[i].line.block){

            var tempObj = _.get(__object, lines[i].parsed);

            if(tempObj[lines[i].line.name]){
                 tempObj[lines[i].line.name].push(lines[i].line.value); 
            } else { 
                tempObj[lines[i].line.name] = [lines[i].line.value]; 
            }

            _.set(__object, lines[i].parsed, tempObj) ;
        }
    }   
    return  __object;
}


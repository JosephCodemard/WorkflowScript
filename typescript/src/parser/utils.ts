// IMPORTS
import { LineData, ParsedLine } from "./interfaces"

export function strip (str: string): string{
    
    str = str.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, "");

    str = str.replace(/    /g, "\t");

    str = str.replace(/:/g, " :");
    str = str.replace(/-/g, "- ");
    

    for (let i = 0; i < str.length; i++) {
        var spaces = 0;
        
        if(str[i] !== "\t"){
            if(str[i] == " "){
                spaces++;
            }else{
                spaces = 0;
            }
        }
        if(spaces > 2){
            str.split("").splice(i, spaces)
            str[i] == " "
        }
        
    }

    return str;
}   


export function toTupple (str:string): Array<ParsedLine> {
    
    const lines = str.split("\n");
    var linesreturn = [];

    for (let i = 0; i < lines.length; i++) {
        var indentation = 0;

        for (let k = 0; k < lines[i].length; k++) {
            if(lines[i][k] === "\t"){
                indentation++;
            }else{
                break;
            }
        }   
        var line_strip = lines[i]
            .replace(/\t/g, "")
            .replace(/\r/g, "")
            .replace(/\s\s+/g, " ")

        if(line_strip.match(/[(a-z)(A-Z)(0-9)(:)(-)]/g)){

            const line : ParsedLine = {
                indentation: indentation,
                content: line_strip
            }

            linesreturn.push(line)
        }
    }

    return linesreturn
}

export function ToLineData (str:string, block:boolean): LineData{
    var stringname:string;
    var stringvalue:string;

    if(!block){
        stringname = str.split(":")[0];
        stringvalue = str.split(":")[1];

        if(!stringvalue){stringvalue = "";}

    }else{
        stringname = str;
        stringvalue = "";
    }

    return {
        name: stringname.replace(/[^A-Za-z0-9\s\[\]\(\)_]/g, "").trim(),
        value: stringvalue.trim(),
        block: block
    }
}

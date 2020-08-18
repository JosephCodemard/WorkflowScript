import { ReadInperpreterInput, WorkflowScript } from "../language-setup/interpreterfuncs"


function strip (str: string): string{
    
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


interface ParsedLine {
    indentation: number;
    content: string;
}

interface LineData{
    name: string;
    value: string;
    block: boolean;
}

interface InterpretLine {
    parsed: Array<string>;
    line: LineData
}

function toTupple (str:string): Array<ParsedLine> {
    
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

function ToLineData (str:string, block:boolean): LineData{
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
        value: stringvalue/*.replace(/[^A-Za-z0-9\s\{\}\[\]\(\),.'"_\$]/g, "")*/.trim(),
        block: block
    }
}

function parse (file:any): Array<InterpretLine>{

    file = ReadInperpreterInput(file);

    const str:string = strip(file);
    const tupples:Array<ParsedLine> = toTupple(str);

    var arrayPointer:Array<ParsedLine> = [];

    var interpretLines: Array<InterpretLine> = [];

    for (let i = 0; i < tupples.length; i++) {

        if(tupples[i].content.split(" ")[0] === '-'){   // starts in '-'

            const ap_str: string[] = []
            for (let k = 0; k < arrayPointer.length; k++) { ap_str.push(arrayPointer[k].content); }

            interpretLines.push({
                parsed: ap_str,
                line: ToLineData(tupples[i].content, false)
            });


        }else{  // ends in ':'
           
            if(arrayPointer.length == 0 || tupples[i].indentation > arrayPointer[arrayPointer.length - 1].indentation ){

                tupples[i].content = tupples[i].content.replace(/[^A-Za-z0-9]/g, "");

                arrayPointer.push(tupples[i]);

            }else if(tupples[i].indentation < arrayPointer[arrayPointer.length - 1].indentation){
                for (let k = arrayPointer.length - 1; k > 0; k--) {
                    if(arrayPointer[k].indentation == tupples[i].indentation){
                        arrayPointer.splice(arrayPointer.length - k, 1);
                        break;
                    }                    
                }

            }else{
                tupples[i].content = tupples[i].content.replace(/[^A-Za-z0-9]/g, "");
                arrayPointer[arrayPointer.length - 1] = tupples[i]
            }


            const ap_str: string[] = []
            for (let k = 0; k < arrayPointer.length; k++) { ap_str.push(arrayPointer[k].content); }

            interpretLines.push({
                parsed: ap_str,
                line: ToLineData(tupples[i].content, true)
            });
        }           
    }

    return interpretLines;
}

export { parse, InterpretLine }
import { WFS_ERROR, ERRORCODES, ERRORTYPES } from "../error/error"

import { InterpretLine } from "../parser/parser";
import { Program } from "./program"


export function SubstituteVariables(_str, prog:Program){
    const _regex = /(\$\{\{)(.*?)(\}\})/g // searches for ${{ ... }}
    const matches = _str.match(_regex)

    // if it finds a variable replace it with the correct value
    if(matches){

        for (let j = 0; j < matches.length; j++) {
            var vname_raw = _str.match(_regex)[0]
            var vname = vname_raw.replace(/[(\$\{\{)(\}\}]/g, "").trim();
            var vval = undefined

            for (let k = 0; k < prog.varStack.GetAll().length; k++) {
                if(prog.varStack.GetAll()[k].name === vname){
                    vval = prog.varStack.GetAll()[k].value;
                }                    
            }

            if(vval == undefined){
                vval == "???"
                throw new WFS_ERROR(ERRORCODES.FATAL, ERRORTYPES.INVALID_SYNTAX, `"${vname}" is undefined in this context`);
            }

            _str = _str.replace(vname_raw, vval);
        }

        return _str;
    }else{
        return false;
    }
}


export function ExecuteLine(line:InterpretLine, prog:Program){

    // splits the line into relevant info
    var params = line.line.value.split(",")
    var name = line.line.name;

    var _FUNCTION:Function;
    var expectvar:boolean;

    var vval = undefined

    // find the function name of the line E.G -[log]: "blah blah blah"  -> log is _FUNCTION
    for (let i = 0; i < prog.funcStack.GetAll().length; i++) {
        if(prog.funcStack.GetAll()[i].name === name){
            _FUNCTION = prog.funcStack.GetAll()[i].func;
            expectvar = prog.funcStack.GetAll()[i].expectvar
        }
    }

    // if the function exepects a variable it will be found on the stack (hopefully!)
    if(expectvar){

        for (let i = 0; i < params.length; i++) {
            for (let k = 0; k < prog.varStack.GetAll().length; k++) {
                if(prog.varStack.GetAll()[k].name === params[i]){
                    vval = prog.varStack.GetAll()[k].value;
                }                    
            }

            if(vval == undefined){
                vval == "???"
                throw new WFS_ERROR(ERRORCODES.WARNING, ERRORTYPES.INVALID_SYNTAX, `Variable "${params[i]}" does not exist in this context`);
            }
                
            params[i] = vval;
        }

    // if not just execute normally
    }else{
        for (let i = 0; i < params.length; i++) {

            var subVars = SubstituteVariables(params[i], prog);

            if(subVars){
                params[i] = subVars;    
            // if not just execute normally
            }else{
                for (let k = 0; k < prog.varStack.GetAll().length; k++) {
                    if(params[i] === prog.varStack.GetAll()[k].name){
                        params[i] = prog.varStack.GetAll()[k].value
                    }                
                }  
            }          
        }
    }

    // if the function does not exist (^^^ see up) ...
    if(!_FUNCTION){

        // check if it is a property
        for (let i = 0; i < prog.propertyStack.GetAll().length; i++) {
            if(prog.propertyStack.GetAll()[i].name == name){
                return
            }
        }

        // then throw an error
        prog.log("properties:", prog.propertyStack.GetAll());
        throw new WFS_ERROR(ERRORCODES.FATAL, ERRORTYPES.INVALID_CONFIGURATION, `function "${name}" does not exist in the current context`);
    }

    // if all is well execute the function !!
    _FUNCTION(...params);
}
import { InterpretLine } from "../../parser/parser";
import { WFS_ERROR, ERRORCODES, ERRORTYPES } from "../../error/error"
import * as bultin_err from "../../error/error_bultin";
import { TYPES } from "../../interpreter/types/types";
import { wfs } from "../../interpreter/wfs";

export function EXECUTE_STATMENT (line:InterpretLine, wfs:wfs) {
    console.log("EXECUTING: ", line);
    var params = line.line.value.split(",")
    var name = line.line.name;

    var _FUNCTION:Function;
    var expectvar:boolean;

    for (let i = 0; i < wfs.functions.Get().length; i++) {
        if(wfs.functions.Get()[i].name === name){
            _FUNCTION = wfs.functions.Get()[i].func;
            expectvar = wfs.functions.Get()[i].expectvar
        }
    }

    if(expectvar){
        //console.log("FUNCTION expects a variable");

        for (let i = 0; i < params.length; i++) {
            for (let k = 0; k < wfs.variables.Get().length; k++) {
                if(wfs.variables.Get()[k].name === params[i]){
                    vval = wfs.variables.Get()[k].value;
                }                    
            }

            if(vval == undefined){
                vval == "???"
                throw new WFS_ERROR(ERRORCODES.WARNING, ERRORTYPES.INVALID_SYNTAX, `Variable "${params[i]}" does not exist in this context`);
            }
            
            params[i] = params[i] = vval;
        }
    }else{
        for (let i = 0; i < params.length; i++) {

            const _regex = /(\$\{\{)(.*?)(\}\})/g
            const matches = params[i].match(_regex)
            if(matches){

                for (let j = 0; j < matches.length; j++) {
                    var vname_raw = params[i].match(_regex)[0]
                    var vname = vname_raw.replace(/[(\$\{\{)(\}\}]/g, "").trim();
                    var vval = undefined

                    for (let k = 0; k < wfs.variables.Get().length; k++) {
                        if(wfs.variables.Get()[k].name === vname){
                            vval = wfs.variables.Get()[k].value;
                        }                    
                    }

                    if(vval == undefined){
                        vval == "???"
                        //throw new WFS_ERROR(ERRORCODES.WARNING, ERRORTYPES.INVALID_SYNTAX, `Variable "${vname}" does not exist in this context`);
                        throw new bultin_err.WFS_UNDEFINED_ERROR(vname);
                    }

                    params[i] = params[i].replace(vname_raw, vval);
                }
            }else{
                for (let k = 0; k < wfs.variables.Get().length; k++) {
                    if(params[i] === wfs.variables.Get()[k].name){
                        params[i] = wfs.variables.Get()[k].value
                    }                
                }  
            }          
        }
    }
    if(_FUNCTION){
        _FUNCTION(...params);
    }
}
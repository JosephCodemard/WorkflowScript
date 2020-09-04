// IMPORTS
import { wfs } from "../../interpreter/wfs";

export function If_func(wfs:wfs){

    console.log("condition: ", wfs.entries.Get("condition").value);
    console.log(" -> ", wfs.entries.GetAll())

    if(wfs.entries.Get("condition").value === "true"){
        wfs.builtin.execAll(wfs.entries.GetAllRaw());
    }
}

export function Loop_func(wfs:wfs){
    for(let i = 0; i < parseInt(wfs.entries.Get("loops").value); i ++){
        wfs.builtin.execAll(wfs.entries.GetAllRaw());
    }
}
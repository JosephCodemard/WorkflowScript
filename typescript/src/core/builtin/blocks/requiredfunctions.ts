//IMPORTS
import { wfs } from "../../interpreter/wfs";

export function Define_func(wfs:wfs){
    wfs.entries.GetAll().forEach(element => {
        wfs.variables.Add(element.name, element.value);
    });
}

export function Run_func(wfs:wfs){
    wfs.builtin.execAll(wfs.entries.GetAllRaw());
}
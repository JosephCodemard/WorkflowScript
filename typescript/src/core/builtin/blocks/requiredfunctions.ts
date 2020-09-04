//IMPORTS
import { wfs } from "../../interpreter/wfs";

export function Define_func(wfs:wfs){
    console.log("\n > DEFINE FUNC < \n");
    wfs.entries.GetAll().forEach(element => {
        wfs.variables.Add(element.name, element.value);
    });
}

export function Run_func(wfs:wfs){
    console.log("\n > RUN FUNC < \n");
    wfs.builtin.execAll(wfs.entries.GetAllRaw());
}
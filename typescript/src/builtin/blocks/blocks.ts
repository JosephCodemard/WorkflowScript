import { TYPES } from "../../interpreter/types/types"
import { Block } from "../../interpreter/types/blocks";
import { wfs } from "../../interpreter/wfs";

export const DEFINE_BLOCK:Block = {
    name:"define",
    type: TYPES.RESERVED,
    path: "",
    func: function(wfs:wfs){
        console.log("running define function")
        wfs.entries.Get().forEach(element => {
            wfs.variables.Add(element.name, element.value);
        });
    },
    properties: []
}  

export const RUN_BLOCK:Block = {
    name:"run",
    type: TYPES.RESERVED,
    path: "",
    func: function(wfs:wfs){
        console.log("running run function")
        wfs.entries.GetRaw().forEach(element => {
            wfs.builtin.exec(element);
        });
    },
    properties: []
}  
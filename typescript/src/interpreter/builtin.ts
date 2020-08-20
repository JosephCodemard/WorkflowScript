import { Func } from "./types/functions"
import { execSync } from "child_process"
import { TYPES } from "./types/types"
import { Variable } from "./types/variables";
import { Block } from "./types/blocks";

export const log_func:Func = {
    name: "log",
    func: function(_:any){
        console.log(_);
    },
    expectvar: false,
    type: TYPES.USER_DEFINED
}

export const exec_func:Func = {
    name: "exec",
    func: function(_:string){
        var exec = execSync(_);
        console.log(exec.toString().trim());
    },
    expectvar: false,
    type: TYPES.USER_DEFINED
}



export const RESERVED_VARIABLES :Array<Variable> = [
    {name: "__dir__", value:__dirname, type: TYPES.RESERVED}
]

export const RESERVED_BLOCKS :Array<Block> = [ ]
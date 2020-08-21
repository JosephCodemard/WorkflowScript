import { Func } from "../interpreter/types/functions"
import { execSync } from "child_process"
import { TYPES } from "../interpreter/types/types"
import { Variable } from "../interpreter/types/variables";
import { Block } from "../interpreter/types/blocks";

import { DEFINE_BLOCK, RUN_BLOCK } from "./blocks/blocks"

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

export const RESERVED_FUNCTIONS:Array<Func> = [
    exec_func,
    log_func
]


export const RESERVED_VARIABLES :Array<Variable> = [
    {name: "__dir__", value:__dirname, type: TYPES.RESERVED}
]

export const RESERVED_BLOCKS :Array<Block> = [
    DEFINE_BLOCK, RUN_BLOCK
 ]
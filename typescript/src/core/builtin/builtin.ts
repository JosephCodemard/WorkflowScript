import { Func } from "../interpreter/types/functions"
import { execSync } from "child_process"
import { TYPES } from "../interpreter/types/types"
import { Variable } from "../interpreter/types/variables";
import { Block } from "../interpreter/types/blocks";

import { DEFINE_BLOCK, RUN_BLOCK } from "./blocks/required"
import { Property } from "../interpreter/types/properties";
import { IF_BLOCK, LOOPS_BLOCK } from "./blocks/addon";

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
    DEFINE_BLOCK,
    RUN_BLOCK,
    IF_BLOCK,
    LOOPS_BLOCK
]

export const RESERVED_PROPERTIES :Array<Property> = [
    //{"name":"name", type: TYPES.RESERVED}
]
RESERVED_BLOCKS.forEach(b => ( b.properties.forEach ( p => RESERVED_PROPERTIES.push( p ) ) ) )

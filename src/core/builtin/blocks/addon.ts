import { TYPES } from "../../interpreter/types/types"
import { Block } from "../../interpreter/types/blocks";
import { If_func, Loop_func, Else_func } from "./addonfunctions";

export const IF_BLOCK:Block = {
    name: "if",
    type: TYPES.RESERVED,
    path: "",
    func: If_func,
    properties: [ {name: "condition", type:TYPES.RESERVED} ]
}

export const ELSE_BLOCK:Block = {
    name: "else",
    type: TYPES.RESERVED,
    path: "",
    func: Else_func,
    properties: []
}

export const LOOPS_BLOCK:Block = {
    name: "loop",
    type: TYPES.RESERVED,
    path: "",
    func: Loop_func,
    properties: [ {name: "loops", type:TYPES.RESERVED} ]
}
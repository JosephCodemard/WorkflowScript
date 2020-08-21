import { TYPES } from "../../interpreter/types/types"
import { Block } from "../../interpreter/types/blocks";
import { If_func, Loop_func } from "./addonfunctions";

export const IF_BLOCK:Block = {
    name: "if",
    type: TYPES.RESERVED,
    path: "",
    func: If_func,
    properties: [ {name: "condition", type:TYPES.RESERVED} ]
}

export const LOOPS_BLOCK:Block = {
    name: "loop",
    type: TYPES.RESERVED,
    path: "",
    func: Loop_func,
    properties: [ {name: "loops", type:TYPES.RESERVED} ]
}
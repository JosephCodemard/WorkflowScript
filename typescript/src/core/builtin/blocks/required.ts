// IMPORTS
import { TYPES } from "../../interpreter/types/types"
import { Block } from "../../interpreter/types/blocks";
import { Define_func, Run_func } from "./requiredfunctions";

export const DEFINE_BLOCK:Block = {
    name:"define",
    type: TYPES.RESERVED,
    path: "",
    func: Define_func,
    properties: []
}  

export const RUN_BLOCK:Block = {
    name:"run",
    type: TYPES.RESERVED,
    path: "",
    func: Run_func,
    properties: []
}  
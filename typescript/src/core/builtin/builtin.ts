import { Variable } from "../interpreter/types/variables";
import { Block } from "../interpreter/types/blocks";
import { Func } from "../interpreter/types/functions"
import { Property } from "../interpreter/types/properties";
import { Flag } from "../interpreter/types/flags";

import { TYPES } from "../interpreter/types/types"

import { DEFINE_BLOCK, RUN_BLOCK } from "./blocks/required"
import { IF_BLOCK, LOOPS_BLOCK, ELSE_BLOCK } from "./blocks/addon";
import { EXEC_FUNC, LOG_FUNC } from "./builtin_funcs"

export const RESERVED_FUNCTIONS:Array<Func> = [
    EXEC_FUNC,
    LOG_FUNC
]


export const RESERVED_VARIABLES :Array<Variable> = [
    {name: "__dir__", value:__dirname, type: TYPES.RESERVED},
    {name: "__ext__", value:"wfs", type: TYPES.RESERVED}
]

export const RESERVED_BLOCKS :Array<Block> = [
    DEFINE_BLOCK,
    RUN_BLOCK,
    IF_BLOCK,
    ELSE_BLOCK,
    LOOPS_BLOCK
]

export const RESEVED_FLAGS :Array<Flag> = [
    {name: "condition", value: "false", type:TYPES.RESERVED}
]

export const RESERVED_PROPERTIES :Array<Property> = [
    {"name":"name", type: TYPES.RESERVED}
]
RESERVED_BLOCKS.forEach(b => ( b.properties.forEach ( p => RESERVED_PROPERTIES.push( p ) ) ) )

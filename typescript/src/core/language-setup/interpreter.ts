// IMPORTS
import { parse } from "../parser/parser"
import { Program } from "../interpreter/program"
import * as fun from "./interpreterfuncs";
// EXPORTS
export {configuration, constant, WorkflowScript, block, func, property} from "./interpreterfuncs";

/**
 * [interpreter] - interpret
 * @description Starts running the program
 * @param {any} _script the code to be run - a filename of class WorkFlowScript
 * @param {configuration} config the config object - class Configuration
 */
export function interpret(_script:any, config:fun.configuration){

    const script = fun.ReadInperpreterInput(_script)
    const constants = config.constants;
    const functions = config.functions;

    const _parsed = parse(_script);

    const program = new Program(_parsed, config);

    program.ExecuteProgram();
}
import { WFS_ERROR, ERRORTYPES, ERRORCODES } from "../error/error";
import { parse, InterpretLine } from "../parser/parser"
import { Interpreter } from "../interpreter/interpreter"
import * as fun from "./interpreterfuncs";
export {configuration, constant, WorkflowScript, block, func, property} from "./interpreterfuncs";


export function interpret(_script:any, config:fun.configuration){

    const script = fun.ReadInperpreterInput(_script)
    const constants = config.constants;
    const functions = config.functions;

    const _parsed = parse(_script);

    var interpreter = new Interpreter(_parsed, config);
    interpreter.interpret();
}
import { Program } from "./program";
import { InterpretLine } from "../parser/parser";
import { Executor } from "./exec";

export class Interpreter{
    
    public program:Program;
    public executor:Executor;

    constructor(prog:Program){
        this.program = prog;
        this.executor = new Executor(this.program);  // new executor instance (program)
    }

    // lines -> all lines in the program
    Interpret(lines:Array<InterpretLine>){
        // execute the [WHOLE] program
        this.executor.ExecuteSubProgram(lines);
    }
}
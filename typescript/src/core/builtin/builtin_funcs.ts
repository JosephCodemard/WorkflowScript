import { Func } from "../interpreter/types/functions"
import { execSync } from "child_process"
import { TYPES } from "../interpreter/types/types"

export const LOG_FUNC:Func = {
    name: "log",
    func: function(_:any){
        console.log(_);
    },
    expectvar: false,
    type: TYPES.USER_DEFINED
}

export const EXEC_FUNC:Func = {
    name: "exec",
    func: function(_:string){
        var exec = execSync(_);
        console.log(exec.toString().trim());
    },
    expectvar: false,
    type: TYPES.USER_DEFINED
}
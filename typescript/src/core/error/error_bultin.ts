import { ERRORCODES, ERRORTYPES, WFS_ERROR } from "./error"

export class WFS_UNDEFINED_ERROR {
    constructor(_var:string, _msg:string=undefined){
        if(_msg){
            return new WFS_ERROR(ERRORCODES.FATAL, ERRORTYPES.INVALID_SYNTAX, _msg);
        }else{
            return new WFS_ERROR(ERRORCODES.FATAL, ERRORTYPES.INVALID_SYNTAX, `"${_var}" is undefined in this context`);
        }
    }
}

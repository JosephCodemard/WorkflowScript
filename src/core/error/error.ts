export enum ERRORCODES{
    'WARNING' = 'WARNING',
    'ERROR' = 'ERROR',
    'FATAL' = 'FATAL'
}

export enum ERRORTYPES {
    'DERCAPRICATION' = 'DERCAPRICATION',
    'INVALID_SYNTAX' = 'INVALID_SYNTAX',
    'INVALID_CONFIGURATION' = 'INVALID_CONFIGURATION',
    'INTERNAL_ERROR' = 'INTERNAL_ERROR',
    'UNKNOWN' = 'UNKNOWN'
}

export interface errorArea{
    linenum:number;
    columnnum:number;
}

export class WFS_ERROR {

    public errtype:ERRORTYPES;
    public errcode:ERRORCODES;
    public message:string;
    public errarea:errorArea;

    constructor (errorcode:ERRORCODES, errortype:ERRORTYPES, message, errarea?:errorArea, log:boolean=true){
        this.errcode = errorcode;
        this.errtype = errortype;
        this.message = message;
        this.errarea = errarea;

        const errmsg = this.log_err(log);

        if(this.errcode == ERRORCODES.FATAL){
            process.exit(1);
        }
    }

    log_err(log){

        var err_string:string

        if(this.errcode === ERRORCODES.FATAL){
            err_string = `[FATAL]`;
        }else if(this.errcode === ERRORCODES.WARNING){
            err_string = `[WARNING]`;
        }else if(this.errcode === ERRORCODES.ERROR){
            err_string = `[ERROR]`;
        }

        var area_str = "";

        if(this.errarea){
            area_str = ` at line ${this.errarea.linenum} and column ${this.errarea.columnnum}`;
        }

        const errmsg = `${err_string} (${this.errtype}) ${this.message} ${area_str}`;
        
        if(log){
            console.log(errmsg);
        }

        return errmsg;
    }
}
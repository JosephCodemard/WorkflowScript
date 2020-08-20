
export interface ParsedLine {
    indentation: number;
    content: string;
}

export interface LineData{
    name: string;
    value: string;
    block: boolean;
}

export interface InterpretLine {
    parsed: Array<string>;
    line: LineData
}
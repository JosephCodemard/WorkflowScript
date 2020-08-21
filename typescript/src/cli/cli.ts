//IMPORTS
import { program } from "commander"
import { readFileSync ,existsSync, writeFileSync } from "fs"
import { load } from "js-yaml"
import { interpreter, JSONConverter, Parser, WFS_CONFIG } from "../core/WorkflowScript"
import { performance } from "perf_hooks"
import { round } from "lodash"


program.version('1.0.0');

program
	.option('-d, --debug', 'show debuging')
    .option('-o, --out <filename>', 'output file')
	.option('-j, --json', 'compile to json')
	.option('-l, --log', 'log the output')
    .option('-f, --file <filename>', 'input file (.wfs)')
    .option('-c, --config <filename>', 'input config file (.ts|.js)')
	.option('-p, --project <filename>', 'config file (.json|.yaml)')
	.option('-i, --interpret', 'interpret and run the file');

const START_TIME = performance.now()
program.parse(process.argv);

var obj = {}


if(program.project !== undefined)
{
	obj = UseConfigFile(program.project);
}

else
{
	obj['out'] = program.out;			
	obj['json'] = program.json;		
	obj['file'] = program.file;			
	obj['config'] = program.config;		
	obj['interpret'] = program.interpret;
	obj['log'] = program.log;
	obj['debug'] = program.debug;
}
console.log("\n		> WORKFLOWSCRIPT [CLI] <		\n");
runcli(obj);

function output(out){
	if(obj['debug']){
		console.log("			", out);
	}
}

function runcli(obj:any){
	
	const config = new interpreter.configuration();
	var _parsed:any;

	if(obj.file){
		output("- Parsing file");
		_parsed = Parser.parse(obj.file);

	}else{
		console.log("[ERROR] input file must be specified");
		return
	}

	if(obj.json){
		const json = JSONConverter.convert(_parsed);

		if(obj.log){
			output("- Outputing JSON");
			console.log(JSON.stringify(json, null, 2));
		}

		if(obj.out !== undefined){
			output("- Writing JSON");
			writeFileSync(obj.out, JSON.stringify( json, null, 2 ));
		}
	}

	if(obj.interpret !== undefined){

		output("- Adding constants")
		if(obj.constants !== undefined){
			for (const key in obj.constants) {
				config.constants[key] = new interpreter.constant(obj.constants[key]);
			}
		}

		output("- Interpreting")
		interpreter.interpret(obj.file, config);
	}

	const END_TIME = performance.now();
	output(`\n		>       COMPLETE       <		( ${round(END_TIME - START_TIME, 3)}secs )\n`);
}


function UseConfigFile(filename:string){
    if(existsSync(filename)){
		console.log(`[INFO] using ${filename} as a config file`);
		
        if(filename.split(".")[filename.split(".").length - 1] === "json"){
			output("- Using '.json' extention");
			return JSON.parse(readFileSync(filename, {encoding: 'utf-8'}));
		}

		else if (filename.split(".")[filename.split(".").length - 1] === "yaml" || filename.split(".")[-1] === "yml"){
			output("- Using '.yaml' extention");
			return load(readFileSync(filename, {encoding: 'utf-8'}));
		}
		else{
			console.log(`[ERROR]  ".${filename.split(".")[filename.split(".").length - 1]}"is an incompatable file extention`);
		}
		
    }else{
      	console.log(`[ERROR] ${filename} does not exist`);
    }
}



// node ./dist/src/cli/cli.js -o ./test/out.json --json -f ./test/example.wfs --config ./test/example.js -i
// node ./dist/src/cli/cli.js -p ./test/wfs.config.json
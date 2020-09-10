# Workflow Script

Workflow script is a block based programming language where every thing can be customized to fit your needs

> Currently only javascript is supported. Python and Go are comming soon

## Contents
- [Getting Started](#Getting-Started)
- [What it is](#What-it-is)
- [Installation](#Installation)
- [Contributing](#Contributing)
- [License](#License)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes


## Docs

Below in [What it is](#What-it-is) there is a brief overview
For more in depth details see the `docs` folder
> The /docs/language.md is about the language itself
> The /docs/Setup.md is about customisation and setup
> The /examples/ is filled with examples

## What it is

Workflow Script is a block based yaml-like language

The idea is that the user can customize all the commands, blocks, variables in the config file.

```workflowscript
/*
	Define block
*/
define:
    - greeting: hello
    - name: jeff
	- cond: true

// A comment
run:
	- log: ${{ greeting }} ${{ name }}
    if:
        - condition: ${{ cond_1 }}
        - log: condition 1 is true !!!
    else:
        - log: condition 2 is false !!!
```

It consists of:
- blocks
- functions
- variables

You make a `*.wfsc.[js | ts]` file - this acts as a config file
You also make a `*.wfs` file - this is where you write your code

Example Javascript code for the `config` file

```Javascript
import { Interpreter, Parser } from  "../src/core/WorkflowScript"

var config = new  Interpreter.configuration();

config.constants['js'] = new  Interpreter.constant('javascript');
config.debug = false;

const  scriptComplete = Interpreter.interpret('/typescript/test/example.wfs', config)
```

This code will run the `*.wfs` file


### Installation

First [clone](https://github.com/JosephCodemard/Project-Manager/archive/master.zip) this repo with

```shell
git clone https://github.com/JosephCodemard/WorkflowScript.git
```


#### Installation ( Javascript )
 
```shell
npm install
```
To install project dependancies

```shell
npm run compile
```
To compile to the Typescript code to JavaScript

## CLI

run  `node dist/src/cli/cli.js --help`

## Contributing

Please read [CONTRIBUTING.md](https://github.com/JosephCodemard/WorkflowScript/tree/master/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/JosephCodemard/WorkflowScript/tags). 

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/JosephCodemard/WorkflowScript/blob/master/LICENSE) file for details


### Questions
> If you have any questions Just post an issue with the question !!
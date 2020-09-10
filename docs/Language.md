# Language #

> This is a guide on how the language itself works ( the `*.wfs` file )
> For information on Customisations see `Setup.md`

> Note `Functions` and `entries` are used interchangeably in this documentation and mean the same thing

  ## Content ##
- [Blocks](#Builtin-Blocks-and-how-to-use-them)
- [Entries](#Builtin-Functions-and-how-to-use-them)
- [Variables](#Variables-and-how-to-use-them)


## What it is ##

Workflow Script is a fully customisable language.  

## Structure ##

> Here is some example code

 
```workflowscript
define:					// Here is a block
	- greeting: hello		// Here is an entry (must be indented by tab)

run:					// Here is a block
	- log ${{ greeting }} world		// Here is an entry

```

All lines of code ending in `:` are blocks - these are functions that have access to all code inside them

All lines of code starting with  `-` are entries - these are statements that will be run by the blocks

The blocks are defined in the config file `*.wfsc.[py | js | go]`
> Note - The ones used here are built in (`run`, `define`, `if`, `else`)

And the entries can also be defined in the config file
> Note - `log` and `exec` are built in



### Builtin Blocks and how to use them

#### Define 
The first builtin block is `define`
>This block comes with workflowscript.

 It creates a variable with all code defined inside it :
 eg
 ```workflowscript
 - name : hello
 ```
 would create a variable `name` and set the value to `hello` 

#### Run

The second builtin block is `run`
>This block comes with workflowscript and so does the function log

unlike `define` the run block runs all the code inside it, utilizing the functions  eg
 ```workflowscript
 - log: hello
 ```
 would call the `log` function with `hello` as the first parameter
However if you ran 
```workflowscript 
- bye : hello
```
you would get an error as the function `bye` is not defined - you would have to add it in the config file

### Builtin Functions and how to use them

Functions ( also know as entries ) are all bits of code starting with a `-` These are interpreted by the block that they are in

> NOTE - The entry must be tabbed inside the block for it to count
> eg `\t - code...`

[See what to different blocks to to their entries](#Builtin-Blocks-and-how-to-use-them)

The `log` function for example will log out all parameters in the stdout

You can run this function
```workflowscript
run:	// don't forget to put it in the run block
	- log : hello world // will log "hello world"
```
The `exec` function is another builtin function and will execute a command

```workflowscript
run:	// don't forget to put it in the run block
	- exec: ls // run the "ls" command
```

### Variables and how to use them

Variables can be referenced by using `${{ varnamehere }}`
They can be added using builtin block `define`
The variables will then be interpreted are replaced with their value


### Questions
> If you have any questions just post an issue with the question !!
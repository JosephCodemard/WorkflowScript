# Setup #

> This is a guide on customisations and intergration
> For information on the langauge see /Language.md

> Note `Functions` and `entries` are used interchangeably in this documentation and mean the same thing


  ## Content ##
- [Setup](#Setup)
- [Variables](#Variables-and-how-to-make-them)
- [Blocks](#Builtin-Blocks-and-how-to-make-them)
- [Entries](#Builtin-Functions-and-how-to-make-them)
- [Example Code](#Examples)


# Setup

> This is the minmum that will get the code working
> This simply uses bultin functions

```Typescript

// Import the relevant modules
import { Interpreter, Parser } from  "../src/core/WorkflowScript"

// The config
var config = new Interpreter.configuration();

// ALL OTHER CODE HERE
// eg vars, funcs, blocks, etc...

// runs a 'wfs' file
Interpreter.interpret('/typescript/test/example.wfs', config)
```



# Variables and how to make them

Variables are names that can be accessed in the `wfs` file

They are created by adding a `constant` (same as variable)

```Typescript
config.constants['js'] = new Interpreter.constant('javascript');
```

The code above will assign `js` to the full value  `javascript`

This means in the `wfs` file you can use:

```workflowscript
- log: ${{ js }}
```

The code will call the log function, with the variable `js` as a paramater
> Remember `${{ var-here }}` denotes a variable, user defined, or config defined

```Typescript
config.constants['python'] = new Interpreter.constant('py');
```

This code will do the same, but instead assign `python` to `py`
This means  
```workflowscript
- log: ${{ python }}
```
will log `py`


# Blocks and how to make them #

A block is a section of code that has control of all code inside it

```typescript

config.blocks['myblock'] = new Interpreter.block(function(_wfs:WFS_CONFIG){
    console.log("My example block")
    _wfs.builtin.execAll(_wfs.entries.GetAllRaw());
}, '', []);


```

The above code creates a block with the name: `myblock`

> Interpreter.block(FUNCTION, PATH, PROPERTIES)

### FUNCTION

This is the code that controls what will be run

> it has a paramater of  `_wfs`, typeof `wfs`

The `wfs` object has :
- entries    -> These are all of the entries inside the block
- builtin    -> These are builtin Functions

- functions  -> These are all global functions
- flags      -> These are all global flags
- variables  -> These are all global variables
- properties -> These are all global properties

> There are examples in the examples folder, Have a go and experiment

#### Builtin

> This is a function that executes all entries in the block

```Javascript
wfs.builtin.execAll(wfs.entries.GetAllRaw())
```

> This is a function that returns all entries in the block

```Javascript
wfs.entries.GetAllRaw()     // raw
wfs.entries.GetAll()        // sanitised
```

### PATH

These are the valid paths

eg `run.inner`

this (^^^) means that the block will only be valid if:

```workflowscript

// VALID
run:
    inner:
        myblock:
            ...

// NOT VALID
run:
    myblock:
        ...

// NOT VALID
run:
    notinner:
        myblock:
            ...
        
```

### PROPERTIES

These are entries that will not be run, and are looked for when the script is being interpreted.


## Builtin Functions and how to make them

```Javascript
config.functions['myfunction'] = new Interpreter.func(function(params){
    console.log("my function: ", params);
    // your code here
});
```

This creates a new function - called in script `myfunction` this has a params array

```workflowscript
- myfunction: hello world, bye

- not_myfunction: hello world, bye      // ERROR - FUNCTION DOES NOT EXIST
```

> params arr = `['hello world', 'bye']`
This function would be called

The builtin functions are:
- log:      console.log(...)
- exec:     executes a command (eg ` dir `)


## Example Code

See `../examples/` for example code
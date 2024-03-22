# YanqiaoChen Artifact

## Table of Cotents

- [YanqiaoChen Artifact](#yanqiaochen-artifact)
  - [Table of Cotents](#table-of-cotents)
  - [Introduction](#introduction)
  - [Motivation](#motivation)
  - [Related Work](#related-work)
  - [Technical Details](#technical-details)
  - [Run Code Smell Detector](#run-code-smell-detector)
    - [Note](#note)
    - [Premise](#premise)
    - [Environment Setup](#environment-setup)
    - [Main Feature: Code Smell Detection](#main-feature-code-smell-detection)
    - [Side Feature: Tree Structure Log](#side-feature-tree-structure-log)
  - [Future Plans](#future-plans)
- [Development Note](#development-note)

## Introduction

This is Yanqiao's Artifact Repository for the 23-24 Allegheny senior session. This artifact will demonstrate the feasibility of my senior project: TreeNose, the language-independent code smell detection.

## Motivation

Code smells are a set of code design problems that hinder programmers to read or maintain the source code in software. Driven by toxicity of code smells, the computer science community have been developing a wide range of code smell detection tools to detect code smells. However, most code smell detection tools are only able to detect code smells in single programming language. To extend the power of code smell detection tools, we developed TreeNose, a language-independent code smell detector.

## Associated Thesis

The related thesis in published in ![this repository](https://github.com/ReadyResearchers-2023-24/cis-600-f2023-610-s2024-senior-thesis-Yanqiao4396)

## Related Work

- [Pysmell](https://github.com/chenzhifei731/Pysmell)
- [Jscent](https://github.com/moskirathe/JScent)
- [DesigniteJava](https://github.com/tushartushar/DesigniteJavas)
## Technical Details

TreeNose currently supports the following languages:
- Java
- JavaScript
- Python 2 and Python 3

TreeNose supports the detection of 5 kinds of code smells with default thresholds

- Complex Conditional
- Long Class
- Long Method
- Long Message Chain
- Long Parameter List

Here is a table about the metrics and thresholds TreeNose by default used to detect those smells:


| Code Smell | Thresholds |
| --- | --- |
| Long Class | LOC > 200, NOM > 20 |
| Long Method | LOM > 100 |
| Long Parameter List | PAR > 5 |
| Complex Conditional | NOC > 3 |
| Long Message Chain | LMC > 4 |

- LOC: lines of class
- NOM: number of sub methods in class
- LOM: length of method
- PAR: number of parameters
- NOC: number of conditional cases
- LMC: length of message chains

**Note**: To fit your need, you can change the thresholds in the [detection configuration file](./src/configs/detect_config.json)

## Run Code Smell Detector

### Note

**The main feature is still in progress**

This section provides an instruction of running code smell detections.

### Premise

To run the example program, **Node** runtime environment and **npm** package manager are required. Here are some documentations on how to install them.
- https://www.npmjs.com/package/npm
- https://nodejs.org/en/download

### Environment Setup
* Go to the directory `src` on your terminal
* Run `npm install`

### Main Feature: Code Smell Detection

`main.js` provides CLI to run TreeNose. It requires three flags to function:

- input: Path to a directory or to a single file
- lang: The target programming language that the target file is written in
- out: Path to a directory the reports will reside
- smell (optional): The smell types to detect, you are able to pass several code smells separated by space


**Note:**
1. `lang` flag accepts: 1. java 2. python 3. javascript
2. `smell` flag accepts: 1. long-class 2. long-param 3. long-method 4. long-message-chain 5. complex-conditional
3. if a directory is provided to flag `input`, TreeNose will fetch all the target files under both the current directory and all of its subdirectories in any level.
4. By default TreeNose checks all kinds of code smells when no `smell` flag needs to be set up

Here is an example:
```bash
node main.js --input ../example_codes/python_codes  --lang python --out ../reports --smell long-param long-class
```

### Side Feature: Tree Structure Log

```
Note: you don't need to understand anything in this section to do code smell detection. However, the tool introduced in section helps you to customize your own TreeNose
```

`tree_printer.js` the Abstract Syntax Tree of a file parsed from [tree-sitter](https://tree-sitter.github.io/tree-sitter/). While the main purpose of the program is to detect code smells, `tree_printer.js` plays an important role on understanding the tree structure 

`tree_printer.js` accepts two **mandatory** flags:
   1. lang
   2. file

Here is an example:
```bash
node tree_printer.js --lang javascript --file ../example_codes/js_codes/conditional.js
```

## Future Plans

- Support more programming languages in TreeNose
- Support more code smell detections in TreeNose

# Development Note

- Currently god class code smell has only method amounts as the metric
- Generator function in Python tree-sitter is treated as expression statement but not function definition

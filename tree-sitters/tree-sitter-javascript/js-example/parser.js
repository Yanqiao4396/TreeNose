const fs = require('fs/promises');
const Parser = require('tree-sitter');
const JavaScript = require('tree-sitter-javascript');
const parser = new Parser();
parser.setLanguage(JavaScript);


async function example() {
    try { 
        const sourceCode = await fs.readFile('parsee_single_class.js', { encoding: 'utf8' });
        const tree = parser.parse(sourceCode);
        const a = recursivelyLog(tree.rootNode)
        console.log(a.join())
        const query = new Parser.Query(JavaScript,'(call_expression) @call')
        const matches= query.matches(tree.rootNode)
        for (let match of matches) {
          const captures = match.captures
          for (let capture of captures) {
                console.log(capture)
          }
        }
    } catch (err) {
      console.log(err);
    }}

    function recursivelyLog(tree_node,indent_count = 0){
      var indentation = '\t'
      var codeStructures = [];
      for (var i = 0; i < tree_node.childCount; i++){
          var child_node = tree_node.child(i)
          codeStructures.push(indentation.repeat(indent_count) + child_node.type + '(' + child_node.startPosition.row + ',' + child_node.startPosition.column + ') , (' + child_node.endPosition.row + ',' + child_node.endPosition.column +  ')' +'\n')
          // console.log(indentation.repeat(indent_count) + child_node.type + '(' + child_node.startPosition.row + ',' + child_node.startPosition.column + ') , (' + child_node.endPosition.row + ',' + child_node.endPosition.column +  ')')
          codeStructures.push(...recursivelyLog(child_node,indent_count + 1))
      }
      return codeStructures
  }

example()


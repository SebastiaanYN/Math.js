const treeify = require('treeify');

const fs = require('fs');
const path = require('path');

const lexer = require('./lexer/lexer.js');
const parser = require('./parser/parser.js');

function load(name) {
  return fs.readFileSync(path.join(__dirname, '../examples', name)).toString();
}

const input = load('complex');

console.log('\nLexing');
const tokens = lexer(input);
console.log(tokens.success ? 'Success' : 'Issue');
console.log(tokens.tokens);

console.log('\nParsing');
const parsed = parser(tokens.tokens);

console.log(`\n${input.trim()}`);
console.log(treeify.asTree(parsed, true));

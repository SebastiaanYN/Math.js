const treeify = require('treeify');

const fs = require('fs');
const path = require('path');

const lexer = require('./lexer/lexer.js');
const parser = require('./parser/parser.js');

function load(name) {
  return fs.readFileSync(path.join(__dirname, '../examples', name)).toString();
}

const input = load('complex');

console.log(input.slice(0, 19).split('\n').length);

console.log('\nLexing');
const lexed = lexer(input);
console.log(lexed.tokens);

console.log('\nParsing');
const parsed = parser(lexed.tokens);

console.log(`\n${input.trim()}`);
console.log(treeify.asTree(parsed.tokens, true));

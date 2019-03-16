const fs = require('fs');
const path = require('path');

const lexer = require('./lexer/lexer.js');
const parser = require('./parser/parser.js');

function load(name) {
  return fs.readFileSync(path.join(__dirname, '../examples', name)).toString();
}

console.log('\nLexing');
const tokens = lexer(load('formula'));
console.log(tokens.success ? 'Success' : 'Issue');
console.log(tokens.tokens);

console.log('\nParsing');
const parsed = parser(tokens.tokens);
console.log(JSON.stringify(parsed, null, 2));

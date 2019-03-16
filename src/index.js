const fs = require('fs');
const path = require('path');

const lexer = require('./lexer/lexer.js');

function load(name) {
  return fs.readFileSync(path.join(__dirname, '../examples', name)).toString();
}

console.log(lexer(load('decimal')));

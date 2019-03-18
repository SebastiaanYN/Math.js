const patterns = require('../syntax/lexing.js');
const lineRow = require('./lineRow.js');

function lexer(string) {
  const tokens = [];
  let index = 0;

  // Loop till we have gone through the entire string
  while (index < string.length) {
    let matched = false;

    for (const [name, pattern] of Object.entries(patterns)) {
      // Match the string with the pattern
      const match = string.slice(index).match(pattern);

      // If we have a match add the token, unless the token should be ignored
      if (match !== null) {
        const raw = match[0];

        if (name !== 'newline'
          && name !== 'space'
          && name !== 'emptyline'
          && name !== 'comment') {
          tokens.push({ name, index, raw });
        }

        index += match[0].length;
        matched = true;
        break;
      }
    }

    // If nothing was matched then the character is invalid
    if (!matched) {
      const { line, row } = lineRow(string, index);

      console.log(`Unknown token ${string.slice(index, index + 1)} at ${line}:${row}`);
      return { success: false, tokens };
    }
  }

  return { success: true, tokens };
}

module.exports = lexer;

const patterns = require('../syntax/lexing.js');

function lexer(string) {
  const tokens = [];

  let index = 0;

  while (index < string.length) {
    let matched = false;

    // eslint-disable-next-line no-loop-func
    Object.entries(patterns).forEach(([name, pattern]) => {
      if (matched) {
        return;
      }

      const match = string.slice(index).match(pattern);

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
      }
    });

    if (!matched) {
      console.log(`Unknown token ${string.slice(index, index + 1)} at index ${index}`);
      return [false, tokens];
    }
  }

  return [true, tokens];
}

module.exports = lexer;

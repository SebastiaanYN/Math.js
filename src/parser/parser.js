const parsing = require('../syntax/parsing.js');

const matchers = Object.keys(parsing);

function parser(tokens) {
  let index = 0;

  while (index < tokens.length) {
    console.log(tokens); // debug

    let matched = false;

    for (let i = 0; i < matchers.length; i += 1) {
      const matcher = matchers[i];

      const match = parsing[matcher](index, tokens);

      if (match !== 0) {
        const raw = tokens.slice(index, index + match).map(token => token.raw).join('');
        const token = { name: matcher, index, raw };

        // eslint-disable-next-line no-param-reassign
        tokens = [...tokens.slice(0, index), token, ...tokens.slice(index + match)];

        matched = true;
        break;
      }
    }

    if (!matched) {
      index += 1;
    }
  }

  return tokens;
}

module.exports = parser;

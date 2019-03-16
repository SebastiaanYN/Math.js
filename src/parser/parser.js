const parsing = require('../syntax/parsing.js');

const matchers = Object.keys(parsing);

function parser(tokens) {
  let index = 0;

  while (index < tokens.length) {
    console.log(tokens); // debug

    let matched = false;

    for (let i = 0; i < matchers.length; i += 1) {
      const matcher = matchers[i];

      const matchTokens = parsing[matcher](index, tokens);

      if (matchTokens.length !== 0) {
        const token = { name: matcher, index, tokens: matchTokens };

        // eslint-disable-next-line no-param-reassign
        tokens = [...tokens.slice(0, index), token, ...tokens.slice(index + matchTokens.length)];

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

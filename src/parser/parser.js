const parsing = require('../syntax/parsing.js');

const matchers = Object.keys(parsing);

function parser(tokens) {
  for (let i = 0; i < matchers.length; i += 1) {
    console.log(tokens);

    const matcher = matchers[i];

    for (let index = 0; index < tokens.length; index += 1) {
      const matchTokens = parsing[matcher](index, tokens);

      if (matchTokens.length !== 0) {
        const token = { name: matcher, index, tokens: matchTokens };

        // eslint-disable-next-line no-param-reassign
        tokens = [...tokens.slice(0, index), token, ...tokens.slice(index + matchTokens.length)];

        break;
      }
    }
  }

  return tokens;
}

module.exports = parser;

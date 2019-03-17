const parsing = require('../syntax/parsing.js');

const matchers = Object.keys(parsing);

function parser(tokens) {
  // Loop until nothing has changed for an entire iteration
  while (true) { // eslint-disable-line no-constant-condition
    let change = false;

    // Loop through all matcher names, runs from top to bottom to retain priority
    for (let i = 0; i < matchers.length; i += 1) {
      console.log(tokens); // debug

      const matcher = matchers[i];

      // Loop through all tokens and see if a token matches
      for (let index = 0; index < tokens.length; index += 1) {
        const match = parsing[matcher](index, tokens, parser);

        if (typeof match === 'object') {
          const matchTokens = tokens.slice(index, index + match.amount);
          const { token } = match;

          // eslint-disable-next-line no-param-reassign
          tokens = [...tokens.slice(0, index), token, ...tokens.slice(index + matchTokens.length)];

          change = true;
          break;
        } else if (match !== 0) {
          // If a group of tokens has matched replace the places were it was with the new token
          const matchTokens = tokens.slice(index, index + match);
          const token = { name: matcher, index, tokens: matchTokens };

          // eslint-disable-next-line no-param-reassign
          tokens = [...tokens.slice(0, index), token, ...tokens.slice(index + matchTokens.length)];

          // Set changes to true so we know atleast 1 thing has changed in this iteration
          change = true;
          break;
        }
      }
    }

    // If there are no more changes everything should be parsed correctly
    if (!change) {
      break;
    }
  }

  return tokens;
}

module.exports = parser;

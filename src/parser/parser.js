const { matchers, illegals } = require('../syntax/parsing.js');

const matcherNames = Object.keys(matchers);

function parser(tokens) {
  // Loop until nothing has changed for an entire iteration
  while (true) {
    let change = false;

    // Loop through all matcher names, runs from top to bottom to retain priority
    for (let i = 0; i < matcherNames.length; i += 1) {
      const matcher = matcherNames[i];

      // Loop through all tokens and see if a token matches
      for (let index = 0; index < tokens.length; index += 1) {
        const match = matchers[matcher](index, tokens, parser);

        if (typeof match === 'object') {
          const matchTokens = tokens.slice(index, index + match.amount);
          const token = { name: matcher, index, tokens: match.token };

          tokens = [...tokens.slice(0, index), token, ...tokens.slice(index + matchTokens.length)];

          change = true;
          break;
        } else if (match !== 0) {
          // If a group of tokens has matched replace the places were it was with the new token
          const matchTokens = tokens.slice(index, index + match);
          const token = { name: matcher, index, tokens: matchTokens };

          tokens = [...tokens.slice(0, index), token, ...tokens.slice(index + matchTokens.length)];

          // Set changes to true so we know atleast 1 thing has changed in this iteration
          change = true;
          break;
        }
      }

      // If there was a change we need to break out and start over to make sure
      // the order of operations stays correct
      if (change) {
        break;
      }
    }

    // If there are no more changes everything should be parsed correctly
    if (!change) {
      break;
    }
  }

  // Check if there is an illegal token left
  for (let i = 0; i < tokens.length; i += 1) {
    if (illegals.includes(tokens[i].name)) {
      console.log(`Illegal ${tokens[i].name} ${tokens[i].raw} at index ${tokens[i].index}`);
      return { success: false, tokens };
    }
  }

  return { success: true, tokens };
}

module.exports = parser;

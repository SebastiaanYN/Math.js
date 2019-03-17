const helpers = {
  wrapped(start, expected, end, index, tokens, parser) {
    const startIndex = index;

    // Return if the first token is not the start token
    if (tokens[startIndex].name !== start) {
      return 0;
    }

    // Loop until we find another start or end token
    let i = index + 1;
    while (![start, end].includes(tokens[i].name)) {
      i += 1;

      // Return if we've gone through all tokens
      if (i >= tokens.length) {
        return 0;
      }
    }

    // If there is another start token before an end token return
    if (tokens[i].name === start) {
      return 0;
    }

    // Parse the matched tokens again
    const matchedTokens = tokens.slice(startIndex + 1, i);
    const match = parser(matchedTokens);

    // If the result of the parsing matches with what we want return the result
    if (match[0].name === expected) {
      return { amount: matchedTokens.length + 2, token: match[0] };
    }

    return 0;
  },
  sequence(sequence, index, tokens) {
    // Check if sequence of token names matches
    for (let i = 0; i < sequence.length; i += 1) {
      let check = sequence[i];

      if (typeof check === 'string') {
        check = [check];
      }

      let match = false;
      for (let j = 0; j < check.length; j += 1) {
        const token = tokens[index + i];
        if (!token) {
          return 0;
        }

        if (token.name === check[j]) {
          match = true;
          break;
        }
      }

      if (!match) {
        return 0;
      }
    }

    // Return the amount of matched tokens
    return sequence.length;
  },
  oneOf(sequence, index, tokens) {
    // Check if one of the tokens matches the current token
    if (sequence.includes(tokens[index].name)) {
      return 1;
    }

    return 0;
  },
};

module.exports = helpers;

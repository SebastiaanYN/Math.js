function arrayify(input) {
  return Array.isArray(input) ? input : [input];
}

class Helpers {
  static wrappedKeep(sequence, index, tokens, parser) {
    const { pre, start, end } = sequence;
    const expected = arrayify(sequence.expected);

    if (!tokens[index] || !tokens[index + 1]) {
      return 0;
    }

    if (tokens[index].name !== pre || tokens[index + 1].name !== start) {
      return 0;
    }

    let startCount = 1;
    let endCount = 0;

    let i = index + 2;
    while (true) {
      if (start.includes(tokens[i].name)) {
        startCount += 1;
      } else if (end.includes(tokens[i].name)) {
        endCount += 1;
      }

      if (startCount === endCount) {
        break;
      }

      i += 1;
      if (i >= tokens.length) {
        return 0;
      }
    }

    // Parse the matched tokens again
    const matchedTokens = tokens.slice(index + 2, i);
    const match = parser(matchedTokens);

    // If the result of the parsing matches with what we want return the result
    if (match.success && expected.includes(match.tokens[0].name)) {
      const token = [tokens[index], tokens[index + 1], match.tokens[0], tokens[i]];

      return { amount: matchedTokens.length + 3, token };
    }

    return 0;
  }

  static wrapped(sequence, index, tokens, parser) {
    const { start, end } = sequence;
    const expected = arrayify(sequence.expected);

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
    if (match.success && expected.includes(match.tokens[0].name)) {
      return { amount: matchedTokens.length + 2, token: [match.tokens[0]] };
    }

    return 0;
  }

  static sequence(sequence, index, tokens) {
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
  }

  static oneOf(sequence, index, tokens) {
    // Check if one of the tokens matches the current token
    if (sequence.includes(tokens[index].name)) {
      return 1;
    }

    return 0;
  }
}

module.exports = Helpers;

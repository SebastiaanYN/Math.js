const helpers = {
  sequence(sequence, index, tokens) {
    // Check if sequence matches
    for (let i = 0; i < sequence.length; i += 1) {
      let check = sequence[i];

      if (typeof check === 'string') {
        check = [check];
      }

      let match = false;
      for (let j = 0; j < check.length; j += 1) {
        const token = tokens[index + i];
        if (!token) {
          return [];
        }

        if (token.name === check[j]) {
          match = true;
          break;
        }
      }

      if (!match) {
        return [];
      }
    }

    // Return the matched tokens
    return tokens.slice(index, index + sequence.length);
  },
};

module.exports = helpers;

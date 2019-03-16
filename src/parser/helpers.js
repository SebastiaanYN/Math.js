const helpers = {
  sequence(sequence, index, tokens) {
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

    return sequence.length;
  },
};

module.exports = helpers;

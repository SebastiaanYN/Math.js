const helpers = require('../parser/helpers.js');

const matchers = {
  assignment(index, tokens) {
    return helpers.sequence([
      'symbol',
      'assign',
      'number',
    ], index, tokens);
  },
  equation(index, tokens) {
    return helpers.sequence([
      ['number', 'symbol', 'equation', 'function'],
      'operator',
      ['number', 'symbol', 'equation', 'function'],
    ], index, tokens);
  },
  function(index, tokens) {
    return helpers.sequence([
      'symbol',
      'lpar',
      ['number', 'equation'],
      'rpar',
    ], index, tokens);
  },
};

module.exports = matchers;

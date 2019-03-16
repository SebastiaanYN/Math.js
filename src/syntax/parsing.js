const helpers = require('../parser/helpers.js');

const math = ['number', 'symbol', 'fn', 'pow', 'mdequation', 'equation'];

const matchers = {
  fn(index, tokens) {
    return helpers.sequence([
      'symbol',
      'lpar',
      math,
      'rpar',
    ], index, tokens);
  },
  pow(index, tokens) {
    return helpers.sequence([
      math,
      'powoperator',
      math,
    ], index, tokens);
  },
  mdequation(index, tokens) {
    return helpers.sequence([
      math,
      'mdoperator',
      math,
    ], index, tokens);
  },
  equation(index, tokens) {
    return helpers.sequence([
      math,
      'operator',
      math,
    ], index, tokens);
  },
  assignment(index, tokens) {
    return helpers.sequence([
      'symbol',
      'assign',
      math,
    ], index, tokens);
  },
};

module.exports = matchers;

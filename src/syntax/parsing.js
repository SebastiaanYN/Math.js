const helpers = require('../parser/helpers.js');

// A set of tokens that can be used for math
const mathable = ['number', 'symbol', 'fn', 'math'];

const matchers = {
  fn(index, tokens) {
    return helpers.sequence([
      'symbol',
      'lpar',
      mathable,
      'rpar',
    ], index, tokens);
  },
  wrapped_math(index, tokens, parser) {
    return helpers.wrapped('lpar', 'math', 'rpar', index, tokens, parser);
  },
  math(index, tokens) {
    return helpers.oneOf([
      'pow_equation',
      'md_equation',
      'equation',
      'wrapped_math',
    ], index, tokens);
  },
  pow_equation(index, tokens) {
    return helpers.sequence([
      mathable,
      'pow_operator',
      mathable,
    ], index, tokens);
  },
  md_equation(index, tokens) {
    return helpers.sequence([
      mathable,
      'md_operator',
      mathable,
    ], index, tokens);
  },
  equation(index, tokens) {
    return helpers.sequence([
      mathable,
      'operator',
      mathable,
    ], index, tokens);
  },
  assignment(index, tokens) {
    return helpers.sequence([
      'symbol',
      'assign',
      mathable,
    ], index, tokens);
  },
};

module.exports = matchers;

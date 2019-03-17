const helpers = require('../parser/helpers.js');

const math = ['number', 'symbol', 'fn', 'math'];

const matchers = {
  fn(index, tokens) {
    return helpers.sequence([
      'symbol',
      'lpar',
      math,
      'rpar',
    ], index, tokens);
  },
  wrapped_math(index, tokens, parser) {
    return helpers.wrapped('lpar', 'math', 'rpar', index, tokens, parser);
  },
  pow(index, tokens) {
    return helpers.sequence([
      math,
      'pow_operator',
      math,
    ], index, tokens);
  },
  md_equation(index, tokens) {
    return helpers.sequence([
      math,
      'md_operator',
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
  math(index, tokens) {
    return helpers.oneOf([
      'pow',
      'md_equation',
      'equation',
      'wrapped_math',
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

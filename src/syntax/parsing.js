const helpers = require('../parser/helpers.js');

// A set of tokens that can be used for math
const mathable = ['number', 'symbol', 'fn', 'math'];

const matchers = {
  fn(index, tokens, parser) {
    return helpers.wrappedKeep({
      pre: 'symbol',
      start: 'lpar',
      expected: mathable,
      end: 'rpar',
    }, index, tokens, parser);
  },
  wrapped_math_multiply(index, tokens) {
    return helpers.sequence([
      'wrapped_math',
      'wrapped_math',
    ], index, tokens);
  },
  wrapped_math(index, tokens, parser) {
    return helpers.wrapped({
      start: 'lpar',
      expected: mathable,
      end: 'rpar',
    }, index, tokens, parser);
  },
  math(index, tokens) {
    return helpers.oneOf([
      'pow_equation',
      'md_equation',
      'equation',
      'wrapped_math',
      'wrapped_math_multiply',
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

// Tokens that can not exist after parsing
const illegals = [
  'assign',
  'lpar',
  'rpar',
  'pow_operator',
  'md_operator',
  'operator',
];

module.exports = { matchers, illegals };

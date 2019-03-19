const functions = require('./functions.js');

function parseFunction(name, content) {
  for (const { regex, parser } of Object.values(functions)) {
    const match = name.match(regex);

    if (match) {
      return parser(content, match);
    }
  }

  throw new Error(`Unkown function ${name}`);
}

const analyzers = {
  fn(node, analyze) {
    const name = node.tokens[0].raw;
    const content = analyze(node.tokens[2]);

    return parseFunction(name, content);
  },
  assignment(node, analyze) {
    const name = node.tokens[0].raw;
    const value = analyze(node.tokens[2]);

    return `var ${name}=${value}`;
  },
  wrapped_math(node, analyze) {
    return analyze(node.tokens[0]);
  },
  math(node, analyze) {
    return analyze(node.tokens[0]);
  },
  pow_equation(node, analyze) {
    const left = analyze(node.tokens[0]);
    const right = analyze(node.tokens[2]);

    return `Math.pow(${left},${right})`;
  },
  md_equation(node, analyze) {
    const left = analyze(node.tokens[0]);
    const operator = node.tokens[1].raw;
    const right = analyze(node.tokens[2]);

    return `(${left}${operator}${right})`;
  },
  equation(node, analyze) {
    const left = analyze(node.tokens[0]);
    const operator = node.tokens[1].raw;
    const right = analyze(node.tokens[2]);

    return `(${left}${operator}${right})`;
  },
  number(node) {
    return node.raw;
  },
  symbol(node) {
    return node.raw;
  },
};

module.exports = analyzers;

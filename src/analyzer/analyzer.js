const analyzers = require('../syntax/analyzing.js');

const finals = {
  assignment(code) {
    return `${code};`;
  },
  math(code) {
    return `console.log(${code});`;
  },
  fn(code) {
    return `console.log(${code});`;
  },
};

function analyze(tree) {
  if (Array.isArray(tree)) {
    const analyzed = tree.map(node => analyzers[node.name](node, analyze));

    for (let i = 0; i < analyzed.length; i++) {
      analyzed[i] = finals[tree[i].name](analyzed[i]);
    }

    return analyzed.join('');
  }

  const analyzer = analyzers[tree.name];

  if (!analyzer) {
    throw new Error(`Unexpected ${tree.name} at index ${tree.index}`);
  }

  return analyzer(tree, analyze);
}

module.exports = analyze;

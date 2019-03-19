const analyzers = require('../syntax/analyzing.js');

function analyze(tree) {
  if (Array.isArray(tree)) {
    return tree.map(node => analyzers[node.name](node, analyze));
  }

  const analyzer = analyzers[tree.name];

  if (!analyzer) {
    throw new Error(`Unexpected ${tree.name} at index ${tree.index}`);
  }

  return analyzer(tree, analyze);
}

module.exports = analyze;

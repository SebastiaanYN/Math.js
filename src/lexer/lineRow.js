function lineRow(string, index) {
  const lines = string.slice(0, index).split('\n');

  const line = lines.length;
  const row = lines[lines.length - 1].length + 1;

  return { line, row };
}

module.exports = lineRow;

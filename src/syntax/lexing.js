const patterns = {
  number: /^(0|-?[1-9][0-9]*)([.,][0-9]+)?/,
  symbol: /^[a-z$_][a-z$_0-9]*/i,
  assign: /^=/,

  lpar: /^[\(]/,
  rpar: /^[\)]/,

  pow_operator: /^\^/,
  md_operator: /^[*\/%]/,
  operator: /^[+-]/,

  comment: /^ *#[^\r\n]+/,
  newline: /^\r?\n/,
  space: /^ +/,
  emptyline: /^(\r?\n[ \t\f]*\r?\n)+/,
};

module.exports = patterns;

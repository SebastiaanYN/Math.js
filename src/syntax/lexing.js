const patterns = {
  comment: /^ *#[^\r\n]+/,

  number: /^(0|-?[1-9][0-9]*)([.,][0-9]+)?/,
  symbol: /^[a-z$_][a-z$_0-9]*/i,

  lpar: /^[\(]/,
  rpar: /^[\)]/,

  assign: /^=/,
  operator: /^[-+%*\/^]/,

  newline: /^\r?\n/,
  space: /^ +/,
  emptyline: /^(\r?\n[ \t\f]*\r?\n)+/,
};

module.exports = patterns;

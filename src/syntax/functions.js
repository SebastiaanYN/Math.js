const functions = {
  log: {
    regex: /^log(0|-?[1-9][0-9]*)([.,][0-9]+)?$/,
    parser(content, match) {
      return `(Math.log(${content})/Math.log(${match[1]}))`;
    },
  },
  sqrt: {
    regex: /sqrt/,
    parser(content) {
      return `Math.sqrt(${content})`;
    },
  },
  sin: {
    regex: /sin/,
    parser(content) {
      return `Math.sin(${content}*Math.PI/180)`;
    },
  },
  cos: {
    regex: /cos/,
    parser(content) {
      return `Math.cos(${content}*Math.PI/180)`;
    },
  },
  tan: {
    regex: /tan/,
    parser(content) {
      return `Math.tan(${content}*Math.PI/180)`;
    },
  },
  floor: {
    regex: /floor/,
    parser(content) {
      return `Math.floor(${content})`;
    },
  },
  ceil: {
    regex: /ceil/,
    parser(content) {
      return `Math.ceil(${content})`;
    },
  },
  round: {
    regex: /round/,
    parser(content) {
      return `Math.round(${content})`;
    },
  },
  abs: {
    regex: /abs/,
    parser(content) {
      return `Math.abs(${content})`;
    },
  },
  radians: {
    regex: /radians/,
    parser(content) {
      return `(${content}*Math.PI/180)`;
    },
  },
  degrees: {
    regex: /degrees/,
    parser(content) {
      return `(${content}*180/Math.PI)`;
    },
  },
};

module.exports = functions;

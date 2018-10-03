const Constants = require("./Constants");

class Util {
  static escapeString(str) {
    let output = str;
    Constants.EscapePatterns.forEach(pattern => {
      output = str.replace(pattern[0], pattern[1]);
    });
    return output;
  }

  static unescapeString(str) {
    let output = str;
    Constants.EscapePatterns.forEach(pattern => {
      output = str.replace(pattern[1], pattern[0]);
    });
    return output;
  }
}

module.exports = Util;

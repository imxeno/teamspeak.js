const Constants = require("./Constants");

class Util {
  /**
   * This class cannot be instantiated. The constructor will always throw.
   * @constructor
   */
  constructor() {
    throw new Error(
      `The ${this.constructor.name} class may not be instantiated.`
    );
  }
  /**
   * Escapes string using {@link EscapePatterns}
   * @static
   * @param  {string} str a string to escape
   * @returns {string} escaped string
   */
  static escapeString(str) {
    let output = str;
    Constants.EscapePatterns.forEach(pattern => {
      output = str.replace(pattern[0], pattern[1]);
    });
    return output;
  }

  /**
   * Unescapes string using {@link EscapePatterns}
   * @static
   * @param  {string} str a string to unescape
   * @returns {string} unescaped string
   */
  static unescapeString(str) {
    let output = str;
    Constants.EscapePatterns.forEach(pattern => {
      output = str.replace(pattern[1], pattern[0]);
    });
    return output;
  }
}

module.exports = Util;

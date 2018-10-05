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

  /**
   * Override default options with user-given ones
   * @static
   * @throws {Error}
   * @param  {object} options user-given object with option overrides
   * @param  {object} defaultOptions default options
   * @returns {object} a copy of {defaultOptions} with altered options mentioned in {options}
   */
  static overrideOptions(options, defaultOptions) {
    Object.keys(options).forEach(key => {
      if (!defaultOptions.hasOwnProperty(key)) {
        throw new Error(
          "Unknown option: '" +
            key +
            "' (legal: " +
            Object.keys(defaultOptions).join(", ") +
            ")"
        );
      }
    });
    return Object.assign({}, defaultOptions, options);
  }
}

module.exports = Util;

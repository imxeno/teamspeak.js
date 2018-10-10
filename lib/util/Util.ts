import * as Constants from "./Constants";
import { UnknownObject } from "./Types";

export default class Util {
  /**
   * Escapes string using {@link EscapePatterns}
   * @static
   * @param  {string} str a string to escape
   * @returns {string} escaped string
   */
  public static escapeString(str: string): string {
    let output = str;
    Constants.EscapePatterns.forEach((pattern: string[]) => {
      output = this.replaceAll(str, pattern[0], pattern[1]);
    });
    return output;
  }

  /**
   * Unescapes string using {@link EscapePatterns}
   * @static
   * @param  {string} str a string to unescape
   * @returns {string} unescaped string
   */
  public static unescapeString(str: string): string {
    let output = str;
    Constants.EscapePatterns.forEach((pattern: string[]) => {
      output = this.replaceAll(str, pattern[1], pattern[0]);
    });
    return output;
  }

  /**
   * Replaces all occurences of {search} in {target} with {replacement}
   * @static
   * @param {string} target target string
   * @param {string} search search string
   * @param {string} replacement replacement string
   * @returns {string} processed string
   */
  public static replaceAll(
    target: string,
    search: string,
    replacement: string
  ): string {
    return target.split(search).join(replacement);
  }

  /**
   * Override default options with user-given ones
   * @static
   * @throws {Error}
   * @param  {object} options user-given object with option overrides
   * @param  {object} defaultOptions default options
   * @returns {object} a copy of {defaultOptions} with altered options mentioned in {options}
   */
  public static overrideOptions<T>(
    options: UnknownObject,
    defaultOptions: T
  ): T {
    Object.keys(options).forEach((key: string) => {
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
  /**
   * This class cannot be instantiated. The constructor will always throw.
   * @constructor
   */
  constructor() {
    throw new Error(`The Util class may not be instantiated.`);
  }
}

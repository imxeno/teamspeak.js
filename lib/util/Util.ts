import * as Constants from "./Constants";
import { UnknownObject } from "./Types";

export default class Util {
  /**
   * Escapes string using EscapePatterns
   */
  public static escapeString(str: string): string {
    let output = str;
    Constants.EscapePatterns.forEach((pattern: string[]) => {
      output = this.replaceAll(str, pattern[0], pattern[1]);
    });
    return output;
  }

  /**
   * Unescapes string EscapePatterns
   */
  public static unescapeString(str: string): string {
    let output = str;
    Constants.EscapePatterns.forEach((pattern: string[]) => {
      output = this.replaceAll(str, pattern[1], pattern[0]);
    });
    return output;
  }

  /**
   * Replaces all occurences of search in target using replacements
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
   */
  constructor() {
    throw new Error(`The Util class may not be instantiated.`);
  }
}

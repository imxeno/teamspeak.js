import { UnknownObject } from "../util/Types";
import Util from "../util/Util";
import TSJSResponse from "./Response";
import TSJSError from "../error/Error";

export default class TSJSRequest {
  public method: string;
  public args: UnknownObject;
  public options: string[];
  public resolve: (response: TSJSResponse) => void;
  public reject: (error: TSJSError) => void;
  public response: TSJSResponse[];
  /**
   * Constructs a new instance of TSJSRequest
   * @constructor
   * @param {string} method ServerQuery method name
   * @param {object} args method call arguments
   * @param {array} options method call options
   * @param {function} resolve Promise resolve function
   * @param {function} reject Promise reject function
   */
  constructor(
    method: string,
    args: UnknownObject,
    options: string[],
    resolve: (response: TSJSResponse) => void,
    reject: (error: TSJSError) => void
  ) {
    this.method = method;
    this.args = args;
    this.options = options;
    this.resolve = resolve;
    this.reject = reject;
    this.response = [];
  }
  /**
   * Stringifies TSJSRequest to a form in which it can be send to ServerQuery.
   * @returns {string} stringified request
   */
  public toString(): string {
    const args: string[] = [];
    Object.keys(this.args).forEach((key: string) => {
      const value = this.args[key];
      if (Array.isArray(value)) {
        args.push(
          value
            .map(
              (v: string) => Util.escapeString(key) + "=" + Util.escapeString(v)
            )
            .join("|")
        );
      } else {
        args.push(
          Util.escapeString(key) + "=" + Util.escapeString(String(value))
        );
      }
    });
    return (
      Util.escapeString(this.method) +
      (args.length > 0 ? " " + args.join(" ") : "") +
      (this.options.length > 0
        ? " " + this.options.map((o: string) => "-" + o)
        : "")
    );
  }
}

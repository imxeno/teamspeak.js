import Util from "../util/Util";
import { UnknownObject } from "../util/Types";

export default class TSJSRequest {
  method: string;
  args: UnknownObject;
  options: Array<string>;
  resolve: Function;
  reject: Function;
  response: Array<UnknownObject>;
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
    options: Array<string>,
    resolve: Function,
    reject: Function
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
  toString() {
    const args = [];
    for (const key in this.args) {
      const value = this.args[key];
      if (Array.isArray(value)) {
        args.push(
          value
            .map(
              v => Util.escapeString(key) + "=" + Util.escapeString(String(v))
            )
            .join("|")
        );
      } else {
        args.push(
          Util.escapeString(key) + "=" + Util.escapeString(String(value))
        );
      }
    }
    return (
      Util.escapeString(this.method) +
      (args.length > 0 ? " " + args.join(" ") : "") +
      (this.options.length > 0 ? " " + this.options.map(o => "-" + o) : "")
    );
  }
}
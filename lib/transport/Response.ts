import { UnknownObject } from "../util/Types";
import Util from "../util/Util";

export default class TSJSResponse {
  public raw: UnknownObject[];
  /**
   * Constructs a new instance of TSJSResponse
   * @param {string} response string received from ServerQuery
   */
  constructor(response: string) {
    this.raw = [];
    const arr = response.split("|");
    for (const i in arr) {
      const obj: UnknownObject = {};
      const pairs = arr[i].split(" ");
      for (const k in pairs) {
        const pair = pairs[k].split("=", 2);
        const prop = Util.unescapeString(pair[0]);
        const value = pair.length > 1 ? Util.unescapeString(pair[1]) : null;
        obj[prop] = value;
      }
      this.raw.push(obj);
    }
  }
  /**
   * Checks if this response is an error-type packet
   * @returns {boolean} if response is an error-type packet
   */
  public isError() {
    return this.rawObject().error === null;
  }
  /**
   * Checks if this response is a notify-type packet
   * @returns {boolean} if response is a notification
   */
  public isNotify() {
    return this.rawObject().notify === null;
  }
  /**
   * Treats the raw data as an object and returns it
   * @returns {object} raw data as object
   */
  public rawObject() {
    return this.raw[0];
  }
  /**
   * Treats the raw data as an array of objects
   * @returns {array} raw data as object array
   */
  public rawArray() {
    return this.raw;
  }
}

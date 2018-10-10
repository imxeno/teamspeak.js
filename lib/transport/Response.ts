import { UnknownObject } from "../util/Types";
import Util from "../util/Util";

export default class TSJSResponse {
  public raw: UnknownObject[];
  /**
   * Constructs a new instance of TSJSResponse
   */
  constructor(response: string) {
    this.raw = [];
    const arr = response.split("|");
    arr.forEach((entry: string) => {
      const obj: UnknownObject = {};
      const pairs = entry.split(" ");
      pairs.forEach((pairEntry: string) => {
        const pair = pairEntry.split("=", 2);
        const prop = Util.unescapeString(pair[0]);
        const value = pair.length > 1 ? Util.unescapeString(pair[1]) : null;
        obj[prop] = value;
      });
      this.raw.push(obj);
    });
  }
  /**
   * Checks if this response is an error-type packet
   */
  public isError(): boolean {
    return this.rawObject().error === null;
  }
  /**
   * Checks if this response is a notify-type packet
   */
  public isNotify(): boolean {
    return this.rawObject().notify === null;
  }
  /**
   * Returns the raw data as an object
   */
  public rawObject(): UnknownObject {
    return this.raw[0];
  }
  /**
   * Returns the raw data as an array of objects
   */
  public rawArray(): UnknownObject[] {
    return this.raw;
  }
}

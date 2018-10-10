import TSJSResponse from "../transport/Response";
import { UnknownObject } from "../util/Types";
import TSJSError from "./Error";

export default class TSJSRequestError extends TSJSError {
  public code: string;
  public message: string;
  public raw: UnknownObject;
  /**
   * Constructs an instance of TSJSRequestError from TSJSResponse
   * @constructor
   * @param {TSJSResponse} response response of error-type
   */
  constructor(response: TSJSResponse) {
    super();
    const responseObject = response.rawObject();
    this.code = "SQ" + responseObject.id;
    this.message = responseObject.msg;
    this.raw = {};
    for (const k in responseObject) {
      if (k === "error") { continue; }
      this.raw[k] = responseObject[k];
    }
  }
  /**
   * Gets the ServerQuery error code
   * @returns {string} ServerQuery error code prefixed with SQ (for example SQ520)
   */
  public getCode() {
    return this.code;
  }
  /**
   * Gets a not-really-always-user-friendly ServerQuery error message
   * @returns {string} not-really-always-user-friendly ServerQuery error message
   */
  public getMessage() {
    return this.message;
  }
}

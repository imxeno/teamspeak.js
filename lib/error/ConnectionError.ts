import TSJSError from "./Error";

export default class TSJSConnectionError extends TSJSError {
  public code: string;
  public message: string;
  /**
   * Constructs an instance of TSJSConnectionError from an {@link TSJSConnectionErrorCode}
   * @constructor
   * @param {Error} error native error
   */
  constructor(error: Error) {
    super();
    this.code = "CONNERR";
    this.message = error.message;
  }
  /**
   * Gets the connection error code
   * @returns {string} actually a const string "CONERR";
   */
  public getCode() {
    return this.code;
  }
  /**
   * Gets a really user-friendly error message
   * @returns {string} user-friendly error message
   */
  public getMessage() {
    return this.message;
  }
}

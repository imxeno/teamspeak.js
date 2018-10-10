import TSJSError from "./Error";

export default class TSJSConnectionError extends TSJSError {
  public code: string;
  public message: string;

  constructor(error: Error) {
    super();
    this.code = "CONNERR";
    this.message = error.message;
  }

  /**
   * Gets the connection error code
   */
  public getCode(): string {
    return this.code;
  }

  /**
   * Gets a really user-friendly error message
   */
  public getMessage(): string {
    return this.message;
  }
}

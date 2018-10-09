const TSJSError = require('./Error');

class TSJSRequestError extends TSJSError {
  /**
   * Constructs an instance of TSJSRequestError from TSJSResponse
   * @constructor
   * @param {TSJSResponse} response response of error-type
   */
  constructor(response) {
    super();
    const responseObject = response.rawObject();
    this.code = "SQ" + response.id;
    this.message = response.msg;
    this.raw = {};
    for (const k in responseObject) {
      if (k === "error") continue;
      this.raw[k] = responseObject[k];
    }
  }
  /**
   * Gets the ServerQuery error code
   * @returns {string} ServerQuery error code prefixed with SQ (for example SQ520)
   */
  getCode() {
    return this.code;
  }
  /**
   * Gets a not-really-always-user-friendly ServerQuery error message
   * @returns {string} not-really-always-user-friendly ServerQuery error message
   */
  getMessage() {
    return this.message;
  }
}

module.exports = TSJSRequestError;

const TSJSError = require('./Error');

class TSJSConnectionError extends TSJSError {
  /**
   * Constructs an instance of TSJSConnectionError from an {@link TSJSConnectionErrorCode}
   * @constructor
   * @param {Error} error native error
   */
  constructor(error) {
      super();
      this.code = "CONNERR";
      this.message = error.message;
  }
  /**
   * Gets the connection error code
   * @returns {string} actually a const string "CONERR";
   */
  getCode() {
    return this.code;
  }
  /**
   * Gets a really user-friendly error message
   * @returns {string} user-friendly error message
   */
  getMessage() {
    return this.message;
  }
}

module.exports = TSJSConnectionError;

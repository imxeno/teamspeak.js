class TSJSRequest {
  /**
   * Constructs a new instance of TSJSRequest
   * @constructor
   * @param {string} method ServerQuery method name
   * @param {object} args method call arguments
   * @param {function} resolve Promise resolve function
   * @param {function} reject Promise reject function
   */
  constructor(method, args, resolve, reject) {
    this.method = method;
    this.args = args;
    this.resolve = resolve;
    this.reject = reject;
    this.response = [];
  }
  /**
   * Stringifies TSJSRequest to a form in which it can be send to ServerQuery.
   * @returns {string} stringified request
   */
  toString() {
    return this.method;
  }
}

module.exports = TSJSRequest;

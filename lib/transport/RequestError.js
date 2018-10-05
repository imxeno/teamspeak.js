class TSJSRequestError {
  /**
   * Constructs an instance of TSJSRequestError from TSJSResponse
   * @constructor
   * @param {TSJSResponse} response response of error-type
   */
  constructor(response) {
    this.response = response;
    const responseObject = response.rawObject();
    for (const k in responseObject) {
      if (k === "error") continue;
      this[k] = responseObject[k];
    }
  }
}

module.exports = TSJSRequestError;

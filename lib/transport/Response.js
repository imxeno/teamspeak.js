class TSJSResponse {
  /**
   * Constructs a new instance of TSJSResponse
   * @param {string} response string received from ServerQuery
   */
  constructor(response) {
    const tags = response.split(" ");
    for (let k in tags) {
      const tag = tags[k].split("=", 2);
      this[tag[0]] = tag.length > 1 ? tag[1] : null;
    }
  }
  /**
   * Checks if this response is an error-type packet
   * @returns {boolean}
   */
  isError() {
    return this.error === null;
  }
  /**
   * Checks if this response is a notify-type packet
   * @returns {boolean}
   */
  isNotify() {
    return this.notify === null;
  }
}

module.exports = TSJSResponse;

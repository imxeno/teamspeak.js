const Util = require("../util/Util");

class TSJSResponse {
  /**
   * Constructs a new instance of TSJSResponse
   * @param {string} response string received from ServerQuery
   */
  constructor(response) {
    const arr = response.split("|");
    const isArray = arr.length > 1;
    const pairs = arr.join(" ").split(" ");
    for (let k in pairs) {
      const pair = pairs[k].split("=", 2);
      const prop = Util.unescapeString(pair[0]);
      const value = pair.length > 1 ? Util.unescapeString(pair[1]) : null;
      if (isArray) {
        if (typeof this[prop] === "undefined") this[prop] = [];
        this[prop].push(value);
      } else {
        this[prop] = value;
      }
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

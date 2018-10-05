class TSJSQueryError {
  /**
   * Constructs new TSJSQueryError instance
   * @constructor
   * @param {number} id error id
   * @param {string} msg error message
   */
  constructor(id, msg) {
    this.id = id;
    this.msg = msg;
  }
}

module.exports = TSJSQueryError;

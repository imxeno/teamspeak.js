class TSJSNodeServer {
  /**
   * Constructs a new server node
   * @constructor
   * @param {TSJSServerQuery} sq parent ServerQuery interface
   */
  constructor(sq) {
    this.sq = sq;
  }
  /**
   * Gets ServerQuery interface
   * @returns {TSJSServerQuery} ServerQuery interface
   */
  getServerQuery() {
    return this.sq;
  }
}

module.exports = TSJSNodeServer;

class TSJSNodeServer {
  /**
   * Constructs a new server node
   * @constructor
   * @param {TSJSServerQuery} sq parent ServerQuery interface
   * @param {Number} sid server id
   */
  constructor(sq, sid) {
    this.sq = sq;
    this.sid = sid;
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

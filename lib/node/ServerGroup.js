class TSJSNodeServerGroup {
  /**
   * Constructs a new server group node
   * @constructor
   * @param {TSJSNodeServer} server parent server node
   */
  constructor(server) {
    this.server = server;
  }
  /**
   * Gets parent {@link TSJSNodeServer}
   * @returns {TSJSNodeServer} parent server node
   */
  getServer() {
    return this.server;
  }
}

module.exports = TSJSNodeServerGroup;

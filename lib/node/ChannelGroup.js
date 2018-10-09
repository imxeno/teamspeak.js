class TSJSNodeChannelGroup {
  /**
   * Constructs a new channel group node
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

module.exports = TSJSNodeChannelGroup;

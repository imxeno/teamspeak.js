class TSJSNodeChannel {
  /**
   * Constructs a new channel node
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
  /**
   * Gets parent {@link TSJSServerQuery}
   * @returns {TSJSServerQuery} ServerQuery interface
   */
  getHost() {
    return this.getServer().getHost();
  }
}

module.exports = TSJSNodeChannel;

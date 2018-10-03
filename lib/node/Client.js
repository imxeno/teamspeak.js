const TSJSNodeAbstract = require("./Abstract");

class TSJSNodeClient extends TSJSNodeAbstract {
  /**
   * Constructs a new client node
   * @constructor
   * @param {TSJSNodeServer} server
   */
  constructor(server) {
    super(server);
  }
  /**
   * Gets parent server node
   * @returns {TSJSNodeServer}
   */
  getServer() {
    return this.parent;
  }
  /**
   * Gets parent host node
   * @returns {TSJSNodeServer}
   */
  getHost() {
    return this.getServer().getHost();
  }
}

module.exports = TSJSNodeClient;

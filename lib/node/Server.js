const TSJSNodeAbstract = require("./Abstract");

class TSJSNodeServer extends TSJSNodeAbstract {
  /**
   * Constructs a new server node
   * @constructor
   * @param {TSJSNodeHost} host parent host node
   */
  constructor(host) {
    super(host);
  }
  /**
   * Gets parent host node
   * @returns {TSJSNodeServer} parent host node
   */
  getHost() {
    return this.getServer().getHost();
  }
}

module.exports = TSJSNodeServer;

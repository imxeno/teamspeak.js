const TSJSNodeAbstract = require("./Abstract");

class TSJSNodeServerGroup extends TSJSNodeAbstract {
  /**
   * Constructs a new server group node
   * @constructor
   * @param {TSJSNodeServer} server parent server node
   */
  constructor(server) {
    super(server);
  }
  /**
   * Gets parent server node
   * @returns {TSJSNodeServer} parent server node
   */
  getServer() {
    return this.parent;
  }
  /**
   * Gets parent host node
   * @returns {TSJSNodeServer} host node of parent server node
   */
  getHost() {
    return this.getServer().getHost();
  }
}

module.exports = TSJSNodeServerGroup;

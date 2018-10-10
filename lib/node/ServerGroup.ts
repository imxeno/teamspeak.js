import TSJSNodeServer from "./Server";

class TSJSNodeServerGroup {
  public server: TSJSNodeServer;
  /**
   * Constructs a new server group node
   */
  constructor(server: TSJSNodeServer) {
    this.server = server;
  }
  /**
   * Gets parent server node
   */
  public getServer(): TSJSNodeServer {
    return this.server;
  }
}

module.exports = TSJSNodeServerGroup;

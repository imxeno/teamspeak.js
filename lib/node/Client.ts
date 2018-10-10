import TSJSNodeServer from "./Server";

class TSJSNodeClient {
  public server: TSJSNodeServer;
  /**
   * Constructs a new client node
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

module.exports = TSJSNodeClient;

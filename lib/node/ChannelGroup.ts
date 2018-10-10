import TSJSNodeServer from "./Server";

class TSJSNodeChannelGroup {
  public server: TSJSNodeServer;
  /**
   * Constructs a new channel group node
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

module.exports = TSJSNodeChannelGroup;

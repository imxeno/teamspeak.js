import TSJSNodeServer from "./Server";

export default class TSJSNodeChannel {
  public server: TSJSNodeServer;
  /**
   * Constructs a new channel node
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

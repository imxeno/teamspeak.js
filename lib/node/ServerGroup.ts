import TSJSNodeServer from "./Server";

export default class TSJSNodeServerGroup {
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

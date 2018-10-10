import TSJSTransportServerQuery from "./transport/ServerQuery";
import TSJSNodeServer from "./node/Server";
import { VirtualServerId, VirtualServerPort } from "./util/Types";

export class TSJSServerQuery extends TSJSTransportServerQuery {
  selectedServer: Number | null;
  /**
   * Constructs a new instance of TSJSServerQuery
   * @param {object} options options to override in {@link TSJSTransportServerQuery} (defaults: {@link ServerQueryOptions})
   */
  constructor(options: object) {
    super(options);
    this.selectedServer = null;
  }

  /**
   * Authenticates with the TeamSpeak 3 Server instance using given ServerQuery login credentials
   * @param {string} client_login_name Server Query account username
   * @param {string} client_login_password Server Query account password
   * @returns {Promise} promise
   */
  async login(client_login_name: string, client_login_password: string) {
    await this.send("login", { client_login_name, client_login_password });
  }

  /**
   * Deselects the active virtual server and logs out from the server instance
   * @returns {Promise} promise
   */
  async logout() {
    await this.send("logout");
    this.selectedServer = null;
  }

  /**
   * Selects a server
   * @param {Number} sid server id
   * @returns {Promise} promise
   */
  async selectServer(sid: VirtualServerId) {
    if (this.selectedServer === sid) return;
    await this.send("use", { sid });
    this.selectedServer = sid;
  }

  /**
   * Creates a new {@link TSJSNodeServer} instance from server id
   * @param {Number} sid server id
   * @returns {Promise<TSJSServer>} promise
   */
  async getServerById(sid: VirtualServerId) {
    return new TSJSNodeServer(this, sid);
  }

  /**
   * Gets server id from port
   * @param {Number} virtualserver_port server port
   * @returns {Promise<TSJSServer>} promise
   */
  async getServerIdByPort(virtualserver_port: VirtualServerPort) {
    const response = await this.send("serveridgetbyport", {
      virtualserver_port
    });
    return response.rawObject().server_id;
  }

  /**
   * Creates a new {@link TSJSNodeServer} instance from server port
   * @param {Number} port server port
   * @returns {Promise<TSJSServer>} promise
   */
  async getServerByPort(port: VirtualServerPort) {
    const sid = await this.getServerIdByPort(port);
    return this.getServerById(sid);
  }

  /**
   * Creates an array of {@link TSJSNodeServer} instances
   * @param {Number} sid server id
   * @returns {Promise<Array<TSJSServer>>} promise
   */
  async getServers() {
    const servers = await this.send("serverlist");
    return servers.rawArray().map((server: any) => {
      return new TSJSNodeServer(this, parseInt(server.virtualserver_id));
    });
  }

  /**
   * Stops the entire TeamSpeak 3 Server instance by shutting down the process
   * @returns {Promise} promise
   */
  async stopProcess() {
    await this.send("serverprocessstop");
  }

  /**
   * Closes the ServerQuery connection to the TeamSpeak 3 Server instance
   * @returns {Promise} promise
   */
  async quit() {
    await this.send("quit");
  }

  /**
   * Gets the servers version information including platform and build number
   * @returns {Promise<object>} promise
   */
  async getVersion() {
    const response = await this.send("version");
    return response.rawObject();
  }

  /**
   * Gets detailed connection information about the server instance including uptime,
   * number of virtual servers online, traffic information, etc
   * @returns {Promise<object>} promise
   */
  async getInfo() {
    const response = await this.send("hostinfo");
    return response.rawObject();
  }

  /**
   * Displays the server instance configuration including database revision number,
   * the file transfer port, default group IDs, etc.
   * @returns {Promise<object>} promise
   */
  async getConfig() {
    const response = await this.send("instanceinfo");
    return response.rawObject();
  }
}
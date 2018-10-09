const TSJSTransportServerQuery = require("./transport/ServerQuery");
const TSJSNodeServer = require("./node/Server");

class TSJSServerQuery extends TSJSTransportServerQuery {
  /**
   * Constructs a new instance of TSJSServerQuery
   * @param {object} options options to override in {@link TSJSTransportServerQuery} (defaults: {@link ServerQueryOptions})
   */
  constructor(options) {
    super(options);
    this.selectedServer = null;
  }

  /**
   * Authenticates with the TeamSpeak 3 Server instance using given ServerQuery login credentials
   * @param {string} client_login_name Server Query account username
   * @param {string} client_login_password Server Query account password
   * @returns {Promise} promise
   */
  async login(client_login_name, client_login_password) {
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
  async selectServer(sid) {
    sid = parseInt(sid);
    if(this.selectedServer === sid) return;
    await this.send("use", { sid });
    this.selectedServer = sid;
  }

  /**
   * Creates a new {@link TSJSNodeServer} instance from server id
   * @param {Number} sid server id
   * @returns {Promise<TSJSServer>} promise
   */
  async getServerById(sid) {
    sid = parseInt(sid);
    return new TSJSNodeServer(this, sid);
  }

  /**
   * Gets server id from port
   * @param {Number} virtualserver_port server port
   * @returns {Promise<TSJSServer>} promise
   */
  async getServerIdByPort(virtualserver_port) {
    virtualserver_port = parseInt(virtualserver_port);
    const response = await this.send("serveridgetbyport", { virtualserver_port });
    return response.rawObject().server_id;
  }

  /**
   * Creates a new {@link TSJSNodeServer} instance from server port
   * @param {Number} port server port
   * @returns {Promise<TSJSServer>} promise
   */
  async getServerByPort(port) {
    port = parseInt(port);
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
    return servers.rawArray().map((server) => { 
      return new TSJSNodeServer(this, parseInt(server.virtualserver_id))
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
   * Displays the servers version information including platform and build number
   * @returns {Promise<object>} promise
   */
  async version() {
    const response = await this.send("version");
    return response.rawObject();
  }

}

module.exports = TSJSServerQuery;

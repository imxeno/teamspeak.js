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
    await this.send("use", { sid });
  }

  /**
   * Creates a new {@link TSJSNodeServer} instance from server id
   * @param {Number} sid server id
   * @returns {Promise} promise
   */
  async getServerById(sid) {
    sid = parseInt(sid);
    this.selectServer(sid);
    return new TSJSNodeServer(this, sid);
  }

}

module.exports = TSJSServerQuery;

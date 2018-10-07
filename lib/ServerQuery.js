const TSJSTransportServerQuery = require("./transport/ServerQuery");

class TSJSServerQuery extends TSJSTransportServerQuery {
  /**
   * Constructs a new instance of TSJSServerQuery
   * @param {object} options options to override in {@link TSJSTransportServerQuery} (defaults: {@link ServerQueryOptions})
   */
  constructor(options) {
    super(options);
  }

  /**
   * Authenticates server query interface
   * @param {string} client_login_name Server Query account username
   * @param {string} client_login_password Server Query account password
   */
  async login(client_login_name, client_login_password) {
    return this.send("login", { client_login_name, client_login_password });
  }

}

module.exports = TSJSServerQuery;

const TSJSTransportServerQuery = require("./transport/ServerQuery");

class TSJSServerQuery extends TSJSTransportServerQuery {
  /**
   * Constructs a new instance of TSJSServerQuery
   * @param {object} options options to override in {@link TSJSTransportServerQuery} (defaults: {@link ServerQueryOptions})
   */
  constructor(options) {
    super(options);
    this.loggedInAs = null;
    this.selectedServer = null;
  }

  /**
   * Authenticates server query interface
   * @param {string} client_login_name Server Query account username
   * @param {string} client_login_password Server Query account password
   * @param {bool} set_details if details should be saved
   * @returns {Promise} promise
   */
  login(client_login_name, client_login_password, set_details = true) {
    return new Promise((resolve, reject) => {
      this.send("login", { client_login_name, client_login_password }).then(() => {
        if(set_details) this.loginDetails = { client_login_name, client_login_password };
        this.loggedInAs = { client_login_name, client_login_password };
        resolve();
      }).catch(err => reject(err));
    });
  }

  /**
   * Authenticates server query interface
   * @param {bool} set_details if details should be saved
   * @returns {Promise} promise
   */
  logout(set_details = true) {
    return new Promise((resolve, reject) => {
      this.send("logout").then(() => {
        if(set_details) this.loginDetails = null;
        this.loggedInAs = null;
        this.selectedServer = null;
        resolve();
      }).catch(err => reject(err));
    });
  }

}

module.exports = TSJSServerQuery;

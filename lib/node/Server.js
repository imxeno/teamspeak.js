const TSJSNodeAbstract = require('./Abstract');

class TSJSNodeServer extends TSJSNodeAbstract {
    /**
     * Constructs a new server node
     * @constructor
     * @param {TSJSNodeHost} host
     */
    constructor(host) {
        super(host);
    }
    /**
     * Gets parent host node
     * @returns {TSJSNodeServer}
     */
    getHost() {
        return this.getServer().getHost();
    }
}

module.exports = TSJSNodeServer;

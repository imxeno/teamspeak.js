const TSJSNodeAbstract = require('./Abstract');

class TSJSNodeServerGroup extends TSJSNodeAbstract {
    /**
     * Constructs a new server group node
     * @constructor
     * @param {TSJSNodeServer} server
     */
    constructor(server) {
        super(server);
    }
    /**
     * Gets parent server node
     * @returns {TSJSNodeServer}
     */
    getServer() {
        return this.parent;
    }
    /**
     * Gets parent host node
     * @returns {TSJSNodeServer}
     */
    getHost() {
        return this.getServer().getHost();
    }
}

module.exports = TSJSNodeServerGroup;

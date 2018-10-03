const TSJSNodeAbstract = require('./Abstract');

class TSJSNodeServerGroup extends TSJSNodeAbstract {
    constructor(server) {
        super(server);
    }
    getServer() {
        return this.parent;
    }
    getHost() {
        return this.getServer().getHost();
    }
}

module.exports = TSJSNodeServerGroup;

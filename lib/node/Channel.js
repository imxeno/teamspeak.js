const TSJSNodeAbstract = require('./Abstract');

class TSJSNodeChannel extends TSJSNodeAbstract {
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

module.exports = TSJSNodeChannel;

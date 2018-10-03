const TSJSNodeAbstract = require('./Abstract');

class TSJSNodeServer extends TSJSNodeAbstract {
    constructor(host) {
        super(host);
    }
    getHost() {
        return this.parent;
    }
}

module.exports = TSJSNodeServer;

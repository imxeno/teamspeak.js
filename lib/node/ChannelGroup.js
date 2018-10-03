const TSJSNodeAbstract = require('./Abstract');

class TSJSNodeChannelGroup extends TSJSNodeAbstract {
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

module.exports = TSJSNodeChannelGroup;

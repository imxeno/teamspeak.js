const Constants = require('./Constants');

class Util {
    static escapeString(str) {
        for(const k in Constants.EscapePatterns) {
            const pattern = Constants.EscapePatterns[k];
            str = str.replace(pattern[0], pattern[1]);
        }
        return str;
    }
    static unescapeString(str) {
        for(const k in Constants.EscapePatterns) {
            const pattern = Constants.EscapePatterns[k];
            str = str.replace(pattern[1], pattern[0]);
        }
        return str;
    }
}

module.exports = Util;
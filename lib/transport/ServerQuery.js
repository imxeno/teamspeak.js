const net = require("net");
const readline = require("readline");
const EventEmitter = require("events");

const Defaults = require("../util/Defaults");
const Util = require("../util/Util");
const TSJSRequest = require("./Request");
const TSJSRequestError = require("./RequestError");
const TSJSResponse = require("./Response");

class TSJSTransportServerQuery extends EventEmitter {
  /**
   * Constructs new TSJSServerQuery object
   * @constructor
   * @param {object} options options to override (defaults: {@link ServerQueryOptions})
   */
  constructor(options) {
    super();
    this.options = Util.overrideOptions(options, Defaults.ServerQueryOptions);
    this.socket = new net.Socket();
    this.reader = readline.createInterface(this.socket);
    this.reader.on("line", line => this._onLine(line));
    this.requests = [];
    this.lineCount = 0;
  }

  /**
   * Attempts to establish connection to the server
   */
  connect() {
    this.socket.connect(
      this.options.port,
      this.options.host
    );
  }

  /**
   * ServerQuery socket reader line handler
   * @private
   */
  _onLine(data) {
    if (data.length === 0) return;
    this.lineCount++;
    if (this.lineCount < 3) return;
    if (this.requests.length === 0) return;
    const request = this.requests[0];
    const response = new TSJSResponse(data);
    request.response.push(response);
    if (response.isError()) {
      if (response.rawObject().id === "0") {
        request.resolve(request.response[0]);
      } else {
        request.reject(new TSJSRequestError(response));
      }
      this.requests.shift();
      this._process();
    }
  }

  /**
   * Sends raw string to the ServerQuery interface
   * @private
   * @param {Buffer | string} data data to send
   */
  _sendRaw(data) {
    if (data.length > 0 && data[data.length - 1] !== "\n") data += "\n";
    this.socket.write(data);
  }

  /**
   * Sends raw string to the ServerQuery interface
   * @param {string} method method that will be called
   * @param {object} args arguments for the call
   * @param {array} options options for the call
   */
  async send(method, args = {}, options = []) {
    return new Promise((resolve, reject) => {
      const startProcessing = this.requests.length === 0;
      this.requests.push(
        new TSJSRequest(method, args, options, resolve, reject)
      );
      if (startProcessing) this._process();
    });
  }

  /**
   * Tries to process requests in request queue
   * @private
   */
  _process() {
    if (this.requests.length === 0) return;
    const request = this.requests[0];
    this._sendRaw(request.toString());
  }
}

module.exports = TSJSTransportServerQuery;

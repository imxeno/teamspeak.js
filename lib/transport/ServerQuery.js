const net = require("net");
const readline = require("readline");
const EventEmitter = require("events");

const Defaults = require("../util/Defaults");
const Util = require("../util/Util");
const TSJSRequest = require("./Request");
const TSJSRequestError = require("../error/RequestError");
const TSJSResponse = require("./Response");
const TSJSConnectionError = require("../error/ConnectionError");

class TSJSTransportServerQuery extends EventEmitter {
  /**
   * Constructs new TSJSServerQuery object
   * @constructor
   * @param {object} options options to override (defaults: {@link ServerQueryOptions})
   */
  constructor(options) {
    super();
    this.options = Util.overrideOptions(options, Defaults.ServerQueryOptions);
    this.connectionPromise = null;
    this.socket = new net.Socket();
    this.socket.on("connect", () => {
      this._connectHandler();
    });
    this.socket.on("close", hadError => {
      this._closeHandler(hadError);
    });
    this.socket.on("error", err => {
      this._errorHandler(err);
    });
    this.reader = readline.createInterface(this.socket);
    this.reader.on("line", line => this._onLine(line));
    this.requests = [];
    this.lineCount = 0;
  }

  /**
   * Attempts to establish connection to the server
   * @returns {Promise}
   */
  connect() {
    return new Promise((resolve, reject) => {
      this.socket.connect(
        this.options.port,
        this.options.host
      );
      this.connectionPromise = { resolve, reject };
    });
  }

  /**
   * ServerQuery socket reader line handler
   * @private
   * @param {string} data line
   * @returns {void}
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
   * @throws {TSJSConnectionError}
   * @returns {void}
   */
  _sendRaw(data) {
    if (data.length > 0 && data[data.length - 1] !== "\n") data += "\n";
    try {
      this.socket.write(data);
    } catch (err) {
      throw new TSJSConnectionError(err);
    }
  }

  /**
   * Sends raw string to the ServerQuery interface
   * @param {string} method method that will be called
   * @param {object} args arguments for the call
   * @param {array} options options for the call
   * @returns {Promise<TSJSResponse>} promise which resolves to TSJSResponse
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
   * @returns {void}
   */
  _process() {
    if (this.requests.length === 0) return;
    const request = this.requests[0];
    try {
      this._sendRaw(request.toString());
    } catch (err) {
      request.reject(err);
    }
  }

  /**
   * Socket connect event handler
   * @private
   * @returns {void}
   */
  _connectHandler() {
    if (this.connectionPromise) {
      this.connectionPromise.resolve();
      this.connectionPromise = null;
    }
    this.emit("connect");
    this._process();
  }

  /**
   * Socket close event handler
   * @private
   * @param {bool} hadError if socket closed with an error
   * @returns {void}
   */
  _closeHandler(hadError) {
    while (this.requests.length) {
      const request = this.requests.shift();
      request.reject(new TSJSConnectionError(new Error("Socket is closed")));
    }
    if (!hadError) this.emit("disconnect");
  }

  /**
   * Socket error event handler
   * @private
   * @param {Error} error error
   * @returns {void}
   */
  _errorHandler(error) {
    const connectionError = new TSJSConnectionError(error);
    if (this.connectionPromise) {
      this.connectionPromise.reject(connectionError);
      this.connectionPromise = null;
    }
    this.emit("disconnect", connectionError);
  }
}

module.exports = TSJSTransportServerQuery;

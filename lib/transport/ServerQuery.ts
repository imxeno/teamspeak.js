import * as EventEmitter from "events";
import * as net from "net";
import * as readline from "readline";

import TSJSConnectionError from "../error/ConnectionError";
import TSJSRequestError from "../error/RequestError";
import { DefaultServerQueryOptions } from "../util/Defaults";
import {
  ConnectionPromiseInterface,
  ServerQueryOptions,
  UnknownObject
} from "../util/Types";
import Util from "../util/Util";
import TSJSRequest from "./Request";
import TSJSResponse from "./Response";
import TSJSError from "../error/Error";

export default class TSJSTransportServerQuery extends EventEmitter {
  public options: ServerQueryOptions;
  public connectionPromise: ConnectionPromiseInterface | null;
  public socket: net.Socket;
  public reader: readline.ReadLine;
  public requests: TSJSRequest[];
  public lineCount: number;
  /**
   * Constructs new TSJSServerQuery object
   */
  constructor(options: UnknownObject) {
    super();
    this.options = Util.overrideOptions(options, DefaultServerQueryOptions);
    this.connectionPromise = null;
    this.socket = new net.Socket();
    this.socket.on("connect", () => {
      this._connectHandler();
    });
    this.socket.on("close", (hadError: boolean) => {
      this._closeHandler(hadError);
    });
    this.socket.on("error", (err: Error) => {
      this._errorHandler(err);
    });
    this.reader = readline.createInterface(this.socket);
    this.reader.on("line", (line: string) => this._onLine(line));
    this.requests = [];
    this.lineCount = 0;
  }

  /**
   * Attempts to establish connection to the server
   */
  public connect(): Promise<void> {
    return new Promise<void>(
      (
        resolve: () => void,
        reject: (error: TSJSConnectionError) => void
      ): void => {
        this.socket.connect(
          this.options.port,
          this.options.host
        );
        this.connectionPromise = { resolve, reject };
      }
    );
  }

  /**
   * ServerQuery socket reader line handler
   */
  public _onLine(data: string): void {
    if (data.length === 0) {
      return;
    }
    this.lineCount++;
    if (this.lineCount < 3) {
      return;
    }
    if (this.requests.length === 0) {
      return;
    }
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
   */
  public _sendRaw(data: Buffer | string): void {
    if (data.length > 0 && data[data.length - 1] !== "\n") {
      data += "\n";
    }
    try {
      this.socket.write(data);
    } catch (err) {
      throw new TSJSConnectionError(err);
    }
  }

  /**
   * Sends raw string to the ServerQuery interface
   */
  public async send(
    method: string,
    args: UnknownObject = {},
    options: string[] = []
  ): Promise<TSJSResponse> {
    return new Promise<TSJSResponse>(
      (
        resolve: (response: TSJSResponse) => void,
        reject: (error: TSJSError) => void
      ): void => {
        const startProcessing = this.requests.length === 0;
        this.requests.push(
          new TSJSRequest(method, args, options, resolve, reject)
        );
        if (startProcessing) {
          this._process();
        }
      }
    );
  }

  /**
   * Tries to process requests in request queue
   */
  public _process(): void {
    if (this.requests.length === 0) {
      return;
    }
    const request = this.requests[0];
    try {
      this._sendRaw(request.toString());
    } catch (err) {
      request.reject(err);
    }
  }

  /**
   * Socket connect event handler
   */
  public _connectHandler(): void {
    if (this.connectionPromise) {
      this.connectionPromise.resolve();
      this.connectionPromise = null;
    }
    this.emit("connect");
    this._process();
  }

  /**
   * Socket close event handler
   */
  public _closeHandler(hadError: boolean): void {
    while (this.requests.length) {
      const request = this.requests.shift() as TSJSRequest;
      request.reject(new TSJSConnectionError(new Error("Socket is closed")));
    }
    if (!hadError) {
      this.emit("disconnect");
    }
  }

  /**
   * Socket error event handler
   */
  public _errorHandler(error: Error): void {
    const connectionError = new TSJSConnectionError(error);
    if (this.connectionPromise) {
      this.connectionPromise.reject(connectionError);
      this.connectionPromise = null;
    }
    this.emit("disconnect", connectionError);
  }
}

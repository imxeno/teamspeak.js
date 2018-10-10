import { TSJSServerQuery } from "../ServerQuery";
import { VirtualServerId, UnknownObject } from "../util/Types";

export default class TSJSNodeServer {
  sq: TSJSServerQuery;
  sid: VirtualServerId;
  /**
   * Constructs a new server node
   * @constructor
   * @param {TSJSServerQuery} sq parent ServerQuery interface
   * @param {Number} sid server id
   */
  constructor(sq: TSJSServerQuery, sid: VirtualServerId) {
    this.sq = sq;
    this.sid = sid;
  }
  /**
   * Sets the server id and gets ServerQuery interface
   * @returns {Promise<TSJSServerQuery>} ServerQuery interface
   */
  async getServerQuery() {
    await this.sq.selectServer(this.sid);
    return this.sq;
  }

  /**
   * Sends raw string to the ServerQuery interface
   * @param {string} method method that will be called
   * @param {object} args arguments for the call
   * @param {array} options options for the call
   * @returns {Promise<TSJSResponse>} promise which resolves to TSJSResponse
   */
  async send(
    method: string,
    args: UnknownObject = {},
    options: Array<string> = []
  ) {
    const sq = await this.getServerQuery();
    return sq.send(method, args, options);
  }

  /**
   * Starts this server instance
   * @returns {Promise} promise
   */
  async start() {
    await this.sq.send("serverstart", { sid: this.sid });
  }

  /**
   * Stops this server instance
   * @returns {Promise} promise
   */
  async stop() {
    await this.sq.send("serverstop", { sid: this.sid });
  }
}
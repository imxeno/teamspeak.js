import { TSJSServerQuery } from "../ServerQuery";
import { UnknownObject, VirtualServerId } from "../util/Types";
import TSJSResponse from "../transport/Response";

export default class TSJSNodeServer {
  public sq: TSJSServerQuery;
  public sid: VirtualServerId;
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
  public async getServerQuery(): Promise<TSJSServerQuery> {
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
  public async send(
    method: string,
    args: UnknownObject = {},
    options: string[] = []
  ): Promise<TSJSResponse> {
    const sq = await this.getServerQuery();
    return sq.send(method, args, options);
  }

  /**
   * Starts this server instance
   * @returns {Promise} promise
   */
  public async start(): Promise<void> {
    await this.sq.send("serverstart", { sid: this.sid });
  }

  /**
   * Stops this server instance
   * @returns {Promise} promise
   */
  public async stop(): Promise<void> {
    await this.sq.send("serverstop", { sid: this.sid });
  }
}

import { TSJSServerQuery } from "../ServerQuery";
import { UnknownObject, VirtualServerId } from "../util/Types";
import TSJSResponse from "../transport/Response";

export default class TSJSNodeServer {
  public sq: TSJSServerQuery;
  public sid: VirtualServerId;
  /**
   * Constructs a new server node
   */
  constructor(sq: TSJSServerQuery, sid: VirtualServerId) {
    this.sq = sq;
    this.sid = sid;
  }
  /**
   * Sets the server id and gets ServerQuery interface
   */
  public async getServerQuery(): Promise<TSJSServerQuery> {
    await this.sq.selectServer(this.sid);
    return this.sq;
  }

  /**
   * Sends raw string to the ServerQuery interface
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
   */
  public async start(): Promise<void> {
    await this.sq.send("serverstart", { sid: this.sid });
  }

  /**
   * Stops this server instance
   */
  public async stop(): Promise<void> {
    await this.sq.send("serverstop", { sid: this.sid });
  }
}

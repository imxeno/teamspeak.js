import TSJSNodeServer from "./node/Server";
import TSJSTransportServerQuery from "./transport/ServerQuery";
import {
  VirtualServerId,
  VirtualServerPort,
  UnknownObject
} from "./util/Types";

export class TSJSServerQuery extends TSJSTransportServerQuery {
  public selectedServer: number | null;
  /**
   * Constructs a new instance of TSJSServerQuery
   */
  constructor(options: object) {
    super(options);
    this.selectedServer = null;
  }

  /**
   * Authenticates with the TeamSpeak 3 Server instance using given ServerQuery login credentials
   */
  public async login(
    client_login_name: string,
    client_login_password: string
  ): Promise<void> {
    await this.send("login", { client_login_name, client_login_password });
  }

  /**
   * Deselects the active virtual server and logs out from the server instance
   */
  public async logout(): Promise<void> {
    await this.send("logout");
    this.selectedServer = null;
  }

  /**
   * Selects a server
   */
  public async selectServer(sid: VirtualServerId): Promise<void> {
    if (this.selectedServer === sid) {
      return;
    }
    await this.send("use", { sid });
    this.selectedServer = sid;
  }

  /**
   * Creates a new TSJSNodeServer instance from server id
   */
  public async getServerById(sid: VirtualServerId): Promise<TSJSNodeServer> {
    return new TSJSNodeServer(this, sid);
  }

  /**
   * Gets server id from port
   */
  public async getServerIdByPort(
    virtualserver_port: VirtualServerPort
  ): Promise<VirtualServerId> {
    const response = await this.send("serveridgetbyport", {
      virtualserver_port
    });
    return response.rawObject().server_id;
  }

  /**
   * Creates a new TSJSNodeServer instance from server port
   */
  public async getServerByPort(
    port: VirtualServerPort
  ): Promise<TSJSNodeServer> {
    const sid = await this.getServerIdByPort(port);
    return this.getServerById(sid);
  }

  /**
   * Creates an array of TSJSNodeServer instances
   */
  public async getServers(): Promise<TSJSNodeServer[]> {
    const servers = await this.send("serverlist");
    return servers.rawArray().map((server: any) => {
      return new TSJSNodeServer(this, parseInt(server.virtualserver_id, 10));
    });
  }

  /**
   * Stops the entire TeamSpeak 3 Server instance by shutting down the process
   */
  public async stopProcess(): Promise<void> {
    await this.send("serverprocessstop");
  }

  /**
   * Closes the ServerQuery connection to the TeamSpeak 3 Server instance
   */
  public async quit(): Promise<void> {
    await this.send("quit");
  }

  /**
   * Gets the servers version information including platform and build number
   */
  public async getVersion(): Promise<UnknownObject> {
    const response = await this.send("version");
    return response.rawObject();
  }

  /**
   * Gets detailed connection information about the server instance including uptime,
   * number of virtual servers online, traffic information, etc
   */
  public async getInfo(): Promise<UnknownObject> {
    const response = await this.send("hostinfo");
    return response.rawObject();
  }

  /**
   * Displays the server instance configuration including database revision number,
   * the file transfer port, default group IDs, etc.
   */
  public async getConfig(): Promise<UnknownObject> {
    const response = await this.send("instanceinfo");
    return response.rawObject();
  }
}

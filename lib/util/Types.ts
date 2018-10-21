import TSJSConnectionError from "../error/ConnectionError";

export type Port = number;
export type VirtualServerPort = Port;
export type VirtualServerId = number;
export type ServerGroupId = number;
export type ChannelGroupId = number;
export interface ServerQueryOptions {
  host: string;
  port: VirtualServerPort;
}
export interface UnknownObject {
  [key: string]: any;
}
export interface ConnectionPromiseInterface {
  resolve: () => void;
  reject: (error: TSJSConnectionError) => void;
}

export type VirtualServerPort = number;
export type VirtualServerId = number;
export interface ServerQueryOptions {
  host: string;
  port: VirtualServerPort;
}
export interface UnknownObject {
  [key: string]: any;
}
export interface PromiseInterface {
  resolve: Function;
  reject: Function;
}

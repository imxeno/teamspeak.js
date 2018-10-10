/**
 * TeamSpeak 3 protocol welcome message.
 */
export const TS3ProtocolIdentifier = "TS3";

/**
 * TeamSpeak 3 protocol greeting message prefix.
 */
export const TS3MotdPrefix = "Welcome";

/**
 * TeaSpeak protocol welcome message.
 */
export const TeaProtocolIdentifier = "TeaSpeak";

/**
 * TeaSpeak protocol greeting message prefix.
 */
export const TeaMotdPrefix = "Welcome";

/**
 * TeamSpeak 3 protocol error message prefix.
 */
export const ErrorPrefix = "error";

/**
 * TeamSpeak 3 protocol event message prefix.
 */
export const EventPrefix = "notify";

/**
 * TeamSpeak 3 protocol separators.
 */
export const LineSeparator = "\n";
export const ListSeparator = "|";
export const CellSeparator = " ";
export const PairSeparator = "=";

/**
 * TeamSpeak 3 log levels.
 */
export const LogLevel = {
  Critical: 0x00,
  Error: 0x01,
  Warning: 0x02,
  Debug: 0x03,
  Info: 0x04,
  Development: 0x05
};

/**
 * TeamSpeak 3 token types.
 */
export const TokenType = {
  ServerGroup: 0x00,
  ChannelGroup: 0x01
};

/**
 * TeamSpeak 3 codec identifiers.
 */
export const Codec = {
  SpeexNarrowBand: 0x00,
  SpeexWideBand: 0x01,
  SpeexUltraWideBand: 0x02,
  CeltMono: 0x03,
  OpusVoice: 0x04,
  OpusMusic: 0x05
};

/**
 * TeamSpeak 3 codec encryption modes.
 */
export const CodecEncryption = {
  Individual: 0x00,
  Disabled: 0x01,
  Enabled: 0x02
};

/**
 * TeamSpeak 3 kick reason types.
 */
export const KickType = {
  Channel: 0x04,
  Server: 0x05
};

/**
 * TeamSpeak 3 text message target modes.
 */
export const TextMessageTarget = {
  Client: 0x01,
  Channel: 0x02,
  Server: 0x03
};

/**
 * TeamSpeak 3 plugin command target modes.
 */
export const PluginCommandTarget = {
  Channel: 0x01,
  Server: 0x02,
  Client: 0x03,
  ChannelSubscribed: 0x04
};

/**
 * TeamSpeak 3 host message modes.
 */
export const HostMessageMode = {
  None: 0x00,
  Log: 0x01,
  Modal: 0x02,
  ModalQuit: 0x03
};

/**
 * TeamSpeak 3 host banner modes.
 */
export const HostBannerAdjustMode = {
  None: 0x00,
  IgnoreAspectRatio: 0x01,
  KeepAspectRatio: 0x02
};

/**
 * TeamSpeak 3 client identification types.
 */
export const ClientType = {
  Regular: 0x00,
  ServerQuery: 0x01
};

/**
 * TeamSpeak 3 permission group database types.
 */
export const GroupDBType = {
  Template: 0x00,
  Regular: 0x01,
  ServerQuery: 0x02
};

/**
 * TeamSpeak 3 permission group name modes.
 */
export const GroupNameDisplayMode = {
  None: 0x00,
  Before: 0x01,
  After: 0x02
};

/**
 * TeamSpeak 3 permission group identification types.
 */
export const GroupIdentificationType = {
  Strongest: 0x01,
  Weakest: 0x02
};

/**
 * TeamSpeak 3 permission types.
 */
export const PermissionType = {
  ServerGroup: 0x00,
  Client: 0x01,
  Channel: 0x02,
  ChannelGroup: 0x03,
  ChannelClient: 0x04
};

/**
 * TeamSpeak 3 permission categories.
 */
export const PermissionCategory = {
  Global: 0x10,
  GlobalInformation: 0x11,
  GlobalServerManagement: 0x12,
  GlobalAdministrativeActions: 0x13,
  GlobalSettings: 0x14,
  Server: 0x20,
  ServerInformation: 0x21,
  ServerAdministrativeActions: 0x22,
  ServerSettings: 0x23,
  Channel: 0x30,
  ChannelInformation: 0x31,
  ChannelCreate: 0x32,
  ChannelModify: 0x33,
  ChannelDelete: 0x34,
  ChannelAccess: 0x35,
  Group: 0x40,
  GroupInformation: 0x41,
  GroupCreate: 0x42,
  GroupModify: 0x43,
  GroupDelete: 0x44,
  Client: 0x50,
  ClientInformation: 0x51,
  ClientAdministrativeActions: 0x52,
  ClientBasics: 0x53,
  ClientModify: 0x54,
  FileTransfer: 0x60,
  NeededModifyPower: 0xff
};

/**
 * TeamSpeak 3 file types.
 */
export const FileType = {
  Directory: 0x00,
  Regular: 0x01
};

/**
 * TeamSpeak 3 server snapshot types.
 */
export const SnapshotType = {
  String: 0x00,
  Base64: 0x01,
  HexDec: 0x02
};

/**
 * TeamSpeak 3 reason identifiers.
 */
export const Reason = {
  None: 0x00,
  Move: 0x01,
  Subscription: 0x02,
  Timeout: 0x03,
  ChannelKick: 0x04,
  ServerKick: 0x05,
  ServerBan: 0x06,
  ServerStop: 0x07,
  Disconnect: 0x08,
  ChannelUpdate: 0x09,
  ChannelEdit: 0x0a,
  DisconnectShutdown: 0x0b
};

/**
 * TeamSpeak 3 string escape patterns
 */
export const EscapePatterns = [
  ["\\", "\\\\"],
  ["/", "\\/"],
  [" ", "\\s"],
  ["|", "\\p"],
  [";", "\\;"],
  ["a", "\\a"],
  ["\b", "\\b"],
  ["\f", "\\f"],
  ["\n", "\\n"],
  ["\r", "\\r"],
  ["\t", "\\t"],
  ["\v", "\\v"],
  [" ", "\\s"]
];

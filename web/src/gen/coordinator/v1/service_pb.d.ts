import * as jspb from "google-protobuf"

export class CreateLobbyRequest extends jspb.Message {
  getGameType(): GameType;
  setGameType(value: GameType): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateLobbyRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateLobbyRequest): CreateLobbyRequest.AsObject;
  static serializeBinaryToWriter(message: CreateLobbyRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateLobbyRequest;
  static deserializeBinaryFromReader(message: CreateLobbyRequest, reader: jspb.BinaryReader): CreateLobbyRequest;
}

export namespace CreateLobbyRequest {
  export type AsObject = {
    gameType: GameType,
  }
}

export class CreateLobbyResponse extends jspb.Message {
  getLobby(): Lobby | undefined;
  setLobby(value?: Lobby): void;
  hasLobby(): boolean;
  clearLobby(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateLobbyResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateLobbyResponse): CreateLobbyResponse.AsObject;
  static serializeBinaryToWriter(message: CreateLobbyResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateLobbyResponse;
  static deserializeBinaryFromReader(message: CreateLobbyResponse, reader: jspb.BinaryReader): CreateLobbyResponse;
}

export namespace CreateLobbyResponse {
  export type AsObject = {
    lobby?: Lobby.AsObject,
  }
}

export class Lobby extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getGameType(): GameType;
  setGameType(value: GameType): void;

  getPortsList(): Array<LobbyPort>;
  setPortsList(value: Array<LobbyPort>): void;
  clearPortsList(): void;
  addPorts(value?: LobbyPort, index?: number): LobbyPort;

  getAddress(): string;
  setAddress(value: string): void;

  getNodeName(): string;
  setNodeName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Lobby.AsObject;
  static toObject(includeInstance: boolean, msg: Lobby): Lobby.AsObject;
  static serializeBinaryToWriter(message: Lobby, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Lobby;
  static deserializeBinaryFromReader(message: Lobby, reader: jspb.BinaryReader): Lobby;
}

export namespace Lobby {
  export type AsObject = {
    name: string,
    gameType: GameType,
    portsList: Array<LobbyPort.AsObject>,
    address: string,
    nodeName: string,
  }
}

export class LobbyPort extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getPort(): number;
  setPort(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LobbyPort.AsObject;
  static toObject(includeInstance: boolean, msg: LobbyPort): LobbyPort.AsObject;
  static serializeBinaryToWriter(message: LobbyPort, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LobbyPort;
  static deserializeBinaryFromReader(message: LobbyPort, reader: jspb.BinaryReader): LobbyPort;
}

export namespace LobbyPort {
  export type AsObject = {
    name: string,
    port: number,
  }
}

export enum GameType { 
  GAME_TYPE_INVALID = 0,
  GAME_TYPE_SUDOKU = 1,
}

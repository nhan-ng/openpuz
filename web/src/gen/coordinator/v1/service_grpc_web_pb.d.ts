import * as grpcWeb from 'grpc-web';

import {
  CreateLobbyRequest,
  CreateLobbyResponse} from './service_pb';

export class CoordinatorAPIClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  createLobby(
    request: CreateLobbyRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: CreateLobbyResponse) => void
  ): grpcWeb.ClientReadableStream<CreateLobbyResponse>;

}

export class CoordinatorAPIPromiseClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  createLobby(
    request: CreateLobbyRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<CreateLobbyResponse>;

}


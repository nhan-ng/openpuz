/**
 * @fileoverview gRPC-Web generated client stub for openpuz.coordinator.v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.openpuz = {};
proto.openpuz.coordinator = {};
proto.openpuz.coordinator.v1 = require('./service_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.openpuz.coordinator.v1.CoordinatorAPIClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.openpuz.coordinator.v1.CoordinatorAPIPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.openpuz.coordinator.v1.CreateLobbyRequest,
 *   !proto.openpuz.coordinator.v1.CreateLobbyResponse>}
 */
const methodInfo_CoordinatorAPI_CreateLobby = new grpc.web.AbstractClientBase.MethodInfo(
  proto.openpuz.coordinator.v1.CreateLobbyResponse,
  /** @param {!proto.openpuz.coordinator.v1.CreateLobbyRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.openpuz.coordinator.v1.CreateLobbyResponse.deserializeBinary
);


/**
 * @param {!proto.openpuz.coordinator.v1.CreateLobbyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.openpuz.coordinator.v1.CreateLobbyResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.openpuz.coordinator.v1.CreateLobbyResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.openpuz.coordinator.v1.CoordinatorAPIClient.prototype.createLobby =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/openpuz.coordinator.v1.CoordinatorAPI/CreateLobby',
      request,
      metadata || {},
      methodInfo_CoordinatorAPI_CreateLobby,
      callback);
};


/**
 * @param {!proto.openpuz.coordinator.v1.CreateLobbyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.openpuz.coordinator.v1.CreateLobbyResponse>}
 *     A native promise that resolves to the response
 */
proto.openpuz.coordinator.v1.CoordinatorAPIPromiseClient.prototype.createLobby =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/openpuz.coordinator.v1.CoordinatorAPI/CreateLobby',
      request,
      metadata || {},
      methodInfo_CoordinatorAPI_CreateLobby);
};


module.exports = proto.openpuz.coordinator.v1;


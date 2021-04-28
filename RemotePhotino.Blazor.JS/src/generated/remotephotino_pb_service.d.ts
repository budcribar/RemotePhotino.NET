// package: photinonet
// file: remotephotino.proto

import * as remotephotino_pb from "./remotephotino_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import {grpc} from "@improbable-eng/grpc-web";

type RemotePhotinoServiceProtoGetHeight = {
  readonly methodName: string;
  readonly service: typeof RemotePhotinoServiceProto;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof remotephotino_pb.IdMessageRequest;
  readonly responseType: typeof remotephotino_pb.IntMessageResponse;
};

type RemotePhotinoServiceProtoSetHeight = {
  readonly methodName: string;
  readonly service: typeof RemotePhotinoServiceProto;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof remotephotino_pb.IntMessageRequest;
  readonly responseType: typeof google_protobuf_empty_pb.Empty;
};

type RemotePhotinoServiceProtoGetLeft = {
  readonly methodName: string;
  readonly service: typeof RemotePhotinoServiceProto;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof remotephotino_pb.IdMessageRequest;
  readonly responseType: typeof remotephotino_pb.IntMessageResponse;
};

type RemotePhotinoServiceProtoSetLeft = {
  readonly methodName: string;
  readonly service: typeof RemotePhotinoServiceProto;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof remotephotino_pb.IntMessageRequest;
  readonly responseType: typeof google_protobuf_empty_pb.Empty;
};

type RemotePhotinoServiceProtoGetLocation = {
  readonly methodName: string;
  readonly service: typeof RemotePhotinoServiceProto;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof remotephotino_pb.IdMessageRequest;
  readonly responseType: typeof remotephotino_pb.PointMessageResponse;
};

type RemotePhotinoServiceProtoSetLocation = {
  readonly methodName: string;
  readonly service: typeof RemotePhotinoServiceProto;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof remotephotino_pb.PointMessageRequest;
  readonly responseType: typeof google_protobuf_empty_pb.Empty;
};

type RemotePhotinoServiceProtoGetMonitors = {
  readonly methodName: string;
  readonly service: typeof RemotePhotinoServiceProto;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof remotephotino_pb.IdMessageRequest;
  readonly responseType: typeof remotephotino_pb.MonitorResponse;
};

type RemotePhotinoServiceProtoGetResizable = {
  readonly methodName: string;
  readonly service: typeof RemotePhotinoServiceProto;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof remotephotino_pb.IdMessageRequest;
  readonly responseType: typeof remotephotino_pb.BoolResponse;
};

type RemotePhotinoServiceProtoSetResizable = {
  readonly methodName: string;
  readonly service: typeof RemotePhotinoServiceProto;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof remotephotino_pb.BoolRequest;
  readonly responseType: typeof google_protobuf_empty_pb.Empty;
};

type RemotePhotinoServiceProtoGetScreenDpi = {
  readonly methodName: string;
  readonly service: typeof RemotePhotinoServiceProto;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof remotephotino_pb.IdMessageRequest;
  readonly responseType: typeof remotephotino_pb.UInt32Response;
};

type RemotePhotinoServiceProtoSendMessage = {
  readonly methodName: string;
  readonly service: typeof RemotePhotinoServiceProto;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof remotephotino_pb.SendMessageRequest;
  readonly responseType: typeof google_protobuf_empty_pb.Empty;
};

type RemotePhotinoServiceProtoSetIconFile = {
  readonly methodName: string;
  readonly service: typeof RemotePhotinoServiceProto;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof remotephotino_pb.SendMessageRequest;
  readonly responseType: typeof google_protobuf_empty_pb.Empty;
};

type RemotePhotinoServiceProtoShow = {
  readonly methodName: string;
  readonly service: typeof RemotePhotinoServiceProto;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof remotephotino_pb.IdMessageRequest;
  readonly responseType: typeof google_protobuf_empty_pb.Empty;
};

type RemotePhotinoServiceProtoShowMessage = {
  readonly methodName: string;
  readonly service: typeof RemotePhotinoServiceProto;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof remotephotino_pb.ShowMessageRequest;
  readonly responseType: typeof google_protobuf_empty_pb.Empty;
};

type RemotePhotinoServiceProtoGetSize = {
  readonly methodName: string;
  readonly service: typeof RemotePhotinoServiceProto;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof remotephotino_pb.IdMessageRequest;
  readonly responseType: typeof remotephotino_pb.SizeMessageResponse;
};

type RemotePhotinoServiceProtoSetSize = {
  readonly methodName: string;
  readonly service: typeof RemotePhotinoServiceProto;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof remotephotino_pb.SizeMessageRequest;
  readonly responseType: typeof google_protobuf_empty_pb.Empty;
};

type RemotePhotinoServiceProtoGetTitle = {
  readonly methodName: string;
  readonly service: typeof RemotePhotinoServiceProto;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof remotephotino_pb.IdMessageRequest;
  readonly responseType: typeof remotephotino_pb.StringResponse;
};

type RemotePhotinoServiceProtoSetTitle = {
  readonly methodName: string;
  readonly service: typeof RemotePhotinoServiceProto;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof remotephotino_pb.StringRequest;
  readonly responseType: typeof google_protobuf_empty_pb.Empty;
};

type RemotePhotinoServiceProtoGetTop = {
  readonly methodName: string;
  readonly service: typeof RemotePhotinoServiceProto;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof remotephotino_pb.IdMessageRequest;
  readonly responseType: typeof remotephotino_pb.IntMessageResponse;
};

type RemotePhotinoServiceProtoSetTop = {
  readonly methodName: string;
  readonly service: typeof RemotePhotinoServiceProto;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof remotephotino_pb.IntMessageRequest;
  readonly responseType: typeof google_protobuf_empty_pb.Empty;
};

type RemotePhotinoServiceProtoGetTopmost = {
  readonly methodName: string;
  readonly service: typeof RemotePhotinoServiceProto;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof remotephotino_pb.IdMessageRequest;
  readonly responseType: typeof remotephotino_pb.BoolResponse;
};

type RemotePhotinoServiceProtoSetTopmost = {
  readonly methodName: string;
  readonly service: typeof RemotePhotinoServiceProto;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof remotephotino_pb.BoolRequest;
  readonly responseType: typeof google_protobuf_empty_pb.Empty;
};

type RemotePhotinoServiceProtoNavigateToLocalFile = {
  readonly methodName: string;
  readonly service: typeof RemotePhotinoServiceProto;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof remotephotino_pb.FileMessageRequest;
  readonly responseType: typeof google_protobuf_empty_pb.Empty;
};

type RemotePhotinoServiceProtoNavigateToString = {
  readonly methodName: string;
  readonly service: typeof RemotePhotinoServiceProto;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof remotephotino_pb.StringRequest;
  readonly responseType: typeof google_protobuf_empty_pb.Empty;
};

type RemotePhotinoServiceProtoNavigateToUrl = {
  readonly methodName: string;
  readonly service: typeof RemotePhotinoServiceProto;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof remotephotino_pb.UrlMessageRequest;
  readonly responseType: typeof google_protobuf_empty_pb.Empty;
};

type RemotePhotinoServiceProtoWaitForExit = {
  readonly methodName: string;
  readonly service: typeof RemotePhotinoServiceProto;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof remotephotino_pb.IdMessageRequest;
  readonly responseType: typeof google_protobuf_empty_pb.Empty;
};

type RemotePhotinoServiceProtoGetWidth = {
  readonly methodName: string;
  readonly service: typeof RemotePhotinoServiceProto;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof remotephotino_pb.IdMessageRequest;
  readonly responseType: typeof remotephotino_pb.IntMessageResponse;
};

type RemotePhotinoServiceProtoSetWidth = {
  readonly methodName: string;
  readonly service: typeof RemotePhotinoServiceProto;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof remotephotino_pb.IntMessageRequest;
  readonly responseType: typeof google_protobuf_empty_pb.Empty;
};

type RemotePhotinoServiceProtoCreateWebWindow = {
  readonly methodName: string;
  readonly service: typeof RemotePhotinoServiceProto;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof remotephotino_pb.CreateWebWindowRequest;
  readonly responseType: typeof remotephotino_pb.WebMessageResponse;
};

type RemotePhotinoServiceProtoFileReader = {
  readonly methodName: string;
  readonly service: typeof RemotePhotinoServiceProto;
  readonly requestStream: true;
  readonly responseStream: true;
  readonly requestType: typeof remotephotino_pb.FileReadRequest;
  readonly responseType: typeof remotephotino_pb.FileReadResponse;
};

type RemotePhotinoServiceProtoShutdown = {
  readonly methodName: string;
  readonly service: typeof RemotePhotinoServiceProto;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof remotephotino_pb.IdMessageRequest;
  readonly responseType: typeof google_protobuf_empty_pb.Empty;
};

export class RemotePhotinoServiceProto {
  static readonly serviceName: string;
  static readonly GetHeight: RemotePhotinoServiceProtoGetHeight;
  static readonly SetHeight: RemotePhotinoServiceProtoSetHeight;
  static readonly GetLeft: RemotePhotinoServiceProtoGetLeft;
  static readonly SetLeft: RemotePhotinoServiceProtoSetLeft;
  static readonly GetLocation: RemotePhotinoServiceProtoGetLocation;
  static readonly SetLocation: RemotePhotinoServiceProtoSetLocation;
  static readonly GetMonitors: RemotePhotinoServiceProtoGetMonitors;
  static readonly GetResizable: RemotePhotinoServiceProtoGetResizable;
  static readonly SetResizable: RemotePhotinoServiceProtoSetResizable;
  static readonly GetScreenDpi: RemotePhotinoServiceProtoGetScreenDpi;
  static readonly SendMessage: RemotePhotinoServiceProtoSendMessage;
  static readonly SetIconFile: RemotePhotinoServiceProtoSetIconFile;
  static readonly Show: RemotePhotinoServiceProtoShow;
  static readonly ShowMessage: RemotePhotinoServiceProtoShowMessage;
  static readonly GetSize: RemotePhotinoServiceProtoGetSize;
  static readonly SetSize: RemotePhotinoServiceProtoSetSize;
  static readonly GetTitle: RemotePhotinoServiceProtoGetTitle;
  static readonly SetTitle: RemotePhotinoServiceProtoSetTitle;
  static readonly GetTop: RemotePhotinoServiceProtoGetTop;
  static readonly SetTop: RemotePhotinoServiceProtoSetTop;
  static readonly GetTopmost: RemotePhotinoServiceProtoGetTopmost;
  static readonly SetTopmost: RemotePhotinoServiceProtoSetTopmost;
  static readonly NavigateToLocalFile: RemotePhotinoServiceProtoNavigateToLocalFile;
  static readonly NavigateToString: RemotePhotinoServiceProtoNavigateToString;
  static readonly NavigateToUrl: RemotePhotinoServiceProtoNavigateToUrl;
  static readonly WaitForExit: RemotePhotinoServiceProtoWaitForExit;
  static readonly GetWidth: RemotePhotinoServiceProtoGetWidth;
  static readonly SetWidth: RemotePhotinoServiceProtoSetWidth;
  static readonly CreateWebWindow: RemotePhotinoServiceProtoCreateWebWindow;
  static readonly FileReader: RemotePhotinoServiceProtoFileReader;
  static readonly Shutdown: RemotePhotinoServiceProtoShutdown;
}

type BrowserIPCReceiveMessage = {
  readonly methodName: string;
  readonly service: typeof BrowserIPC;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof remotephotino_pb.IdMessageRequest;
  readonly responseType: typeof remotephotino_pb.StringRequest;
};

type BrowserIPCSendMessage = {
  readonly methodName: string;
  readonly service: typeof BrowserIPC;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof remotephotino_pb.SendSequenceMessageRequest;
  readonly responseType: typeof google_protobuf_empty_pb.Empty;
};

type BrowserIPCGetHeight = {
  readonly methodName: string;
  readonly service: typeof BrowserIPC;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof remotephotino_pb.IdMessageRequest;
  readonly responseType: typeof remotephotino_pb.IntMessageResponse;
};

export class BrowserIPC {
  static readonly serviceName: string;
  static readonly ReceiveMessage: BrowserIPCReceiveMessage;
  static readonly SendMessage: BrowserIPCSendMessage;
  static readonly GetHeight: BrowserIPCGetHeight;
}

type ClientIPCGetClients = {
  readonly methodName: string;
  readonly service: typeof ClientIPC;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof google_protobuf_empty_pb.Empty;
  readonly responseType: typeof remotephotino_pb.ClientResponse;
};

export class ClientIPC {
  static readonly serviceName: string;
  static readonly GetClients: ClientIPCGetClients;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class RemotePhotinoServiceProtoClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  getHeight(
    requestMessage: remotephotino_pb.IdMessageRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: remotephotino_pb.IntMessageResponse|null) => void
  ): UnaryResponse;
  getHeight(
    requestMessage: remotephotino_pb.IdMessageRequest,
    callback: (error: ServiceError|null, responseMessage: remotephotino_pb.IntMessageResponse|null) => void
  ): UnaryResponse;
  setHeight(
    requestMessage: remotephotino_pb.IntMessageRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  setHeight(
    requestMessage: remotephotino_pb.IntMessageRequest,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  getLeft(
    requestMessage: remotephotino_pb.IdMessageRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: remotephotino_pb.IntMessageResponse|null) => void
  ): UnaryResponse;
  getLeft(
    requestMessage: remotephotino_pb.IdMessageRequest,
    callback: (error: ServiceError|null, responseMessage: remotephotino_pb.IntMessageResponse|null) => void
  ): UnaryResponse;
  setLeft(
    requestMessage: remotephotino_pb.IntMessageRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  setLeft(
    requestMessage: remotephotino_pb.IntMessageRequest,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  getLocation(
    requestMessage: remotephotino_pb.IdMessageRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: remotephotino_pb.PointMessageResponse|null) => void
  ): UnaryResponse;
  getLocation(
    requestMessage: remotephotino_pb.IdMessageRequest,
    callback: (error: ServiceError|null, responseMessage: remotephotino_pb.PointMessageResponse|null) => void
  ): UnaryResponse;
  setLocation(
    requestMessage: remotephotino_pb.PointMessageRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  setLocation(
    requestMessage: remotephotino_pb.PointMessageRequest,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  getMonitors(
    requestMessage: remotephotino_pb.IdMessageRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: remotephotino_pb.MonitorResponse|null) => void
  ): UnaryResponse;
  getMonitors(
    requestMessage: remotephotino_pb.IdMessageRequest,
    callback: (error: ServiceError|null, responseMessage: remotephotino_pb.MonitorResponse|null) => void
  ): UnaryResponse;
  getResizable(
    requestMessage: remotephotino_pb.IdMessageRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: remotephotino_pb.BoolResponse|null) => void
  ): UnaryResponse;
  getResizable(
    requestMessage: remotephotino_pb.IdMessageRequest,
    callback: (error: ServiceError|null, responseMessage: remotephotino_pb.BoolResponse|null) => void
  ): UnaryResponse;
  setResizable(
    requestMessage: remotephotino_pb.BoolRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  setResizable(
    requestMessage: remotephotino_pb.BoolRequest,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  getScreenDpi(
    requestMessage: remotephotino_pb.IdMessageRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: remotephotino_pb.UInt32Response|null) => void
  ): UnaryResponse;
  getScreenDpi(
    requestMessage: remotephotino_pb.IdMessageRequest,
    callback: (error: ServiceError|null, responseMessage: remotephotino_pb.UInt32Response|null) => void
  ): UnaryResponse;
  sendMessage(
    requestMessage: remotephotino_pb.SendMessageRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  sendMessage(
    requestMessage: remotephotino_pb.SendMessageRequest,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  setIconFile(
    requestMessage: remotephotino_pb.SendMessageRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  setIconFile(
    requestMessage: remotephotino_pb.SendMessageRequest,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  show(
    requestMessage: remotephotino_pb.IdMessageRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  show(
    requestMessage: remotephotino_pb.IdMessageRequest,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  showMessage(
    requestMessage: remotephotino_pb.ShowMessageRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  showMessage(
    requestMessage: remotephotino_pb.ShowMessageRequest,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  getSize(
    requestMessage: remotephotino_pb.IdMessageRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: remotephotino_pb.SizeMessageResponse|null) => void
  ): UnaryResponse;
  getSize(
    requestMessage: remotephotino_pb.IdMessageRequest,
    callback: (error: ServiceError|null, responseMessage: remotephotino_pb.SizeMessageResponse|null) => void
  ): UnaryResponse;
  setSize(
    requestMessage: remotephotino_pb.SizeMessageRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  setSize(
    requestMessage: remotephotino_pb.SizeMessageRequest,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  getTitle(
    requestMessage: remotephotino_pb.IdMessageRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: remotephotino_pb.StringResponse|null) => void
  ): UnaryResponse;
  getTitle(
    requestMessage: remotephotino_pb.IdMessageRequest,
    callback: (error: ServiceError|null, responseMessage: remotephotino_pb.StringResponse|null) => void
  ): UnaryResponse;
  setTitle(
    requestMessage: remotephotino_pb.StringRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  setTitle(
    requestMessage: remotephotino_pb.StringRequest,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  getTop(
    requestMessage: remotephotino_pb.IdMessageRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: remotephotino_pb.IntMessageResponse|null) => void
  ): UnaryResponse;
  getTop(
    requestMessage: remotephotino_pb.IdMessageRequest,
    callback: (error: ServiceError|null, responseMessage: remotephotino_pb.IntMessageResponse|null) => void
  ): UnaryResponse;
  setTop(
    requestMessage: remotephotino_pb.IntMessageRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  setTop(
    requestMessage: remotephotino_pb.IntMessageRequest,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  getTopmost(
    requestMessage: remotephotino_pb.IdMessageRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: remotephotino_pb.BoolResponse|null) => void
  ): UnaryResponse;
  getTopmost(
    requestMessage: remotephotino_pb.IdMessageRequest,
    callback: (error: ServiceError|null, responseMessage: remotephotino_pb.BoolResponse|null) => void
  ): UnaryResponse;
  setTopmost(
    requestMessage: remotephotino_pb.BoolRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  setTopmost(
    requestMessage: remotephotino_pb.BoolRequest,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  navigateToLocalFile(
    requestMessage: remotephotino_pb.FileMessageRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  navigateToLocalFile(
    requestMessage: remotephotino_pb.FileMessageRequest,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  navigateToString(
    requestMessage: remotephotino_pb.StringRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  navigateToString(
    requestMessage: remotephotino_pb.StringRequest,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  navigateToUrl(
    requestMessage: remotephotino_pb.UrlMessageRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  navigateToUrl(
    requestMessage: remotephotino_pb.UrlMessageRequest,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  waitForExit(
    requestMessage: remotephotino_pb.IdMessageRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  waitForExit(
    requestMessage: remotephotino_pb.IdMessageRequest,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  getWidth(
    requestMessage: remotephotino_pb.IdMessageRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: remotephotino_pb.IntMessageResponse|null) => void
  ): UnaryResponse;
  getWidth(
    requestMessage: remotephotino_pb.IdMessageRequest,
    callback: (error: ServiceError|null, responseMessage: remotephotino_pb.IntMessageResponse|null) => void
  ): UnaryResponse;
  setWidth(
    requestMessage: remotephotino_pb.IntMessageRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  setWidth(
    requestMessage: remotephotino_pb.IntMessageRequest,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  createWebWindow(requestMessage: remotephotino_pb.CreateWebWindowRequest, metadata?: grpc.Metadata): ResponseStream<remotephotino_pb.WebMessageResponse>;
  fileReader(metadata?: grpc.Metadata): BidirectionalStream<remotephotino_pb.FileReadRequest, remotephotino_pb.FileReadResponse>;
  shutdown(
    requestMessage: remotephotino_pb.IdMessageRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  shutdown(
    requestMessage: remotephotino_pb.IdMessageRequest,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
}

export class BrowserIPCClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  receiveMessage(requestMessage: remotephotino_pb.IdMessageRequest, metadata?: grpc.Metadata): ResponseStream<remotephotino_pb.StringRequest>;
  sendMessage(
    requestMessage: remotephotino_pb.SendSequenceMessageRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  sendMessage(
    requestMessage: remotephotino_pb.SendSequenceMessageRequest,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  getHeight(
    requestMessage: remotephotino_pb.IdMessageRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: remotephotino_pb.IntMessageResponse|null) => void
  ): UnaryResponse;
  getHeight(
    requestMessage: remotephotino_pb.IdMessageRequest,
    callback: (error: ServiceError|null, responseMessage: remotephotino_pb.IntMessageResponse|null) => void
  ): UnaryResponse;
}

export class ClientIPCClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  getClients(requestMessage: google_protobuf_empty_pb.Empty, metadata?: grpc.Metadata): ResponseStream<remotephotino_pb.ClientResponse>;
}


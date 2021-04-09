// package: photinonet
// file: remotephotino.proto

var remotephotino_pb = require("./remotephotino_pb");
var google_protobuf_empty_pb = require("google-protobuf/google/protobuf/empty_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var RemotePhotinoServiceProto = (function () {
  function RemotePhotinoServiceProto() {}
  RemotePhotinoServiceProto.serviceName = "photinonet.RemotePhotinoServiceProto";
  return RemotePhotinoServiceProto;
}());

RemotePhotinoServiceProto.GetHeight = {
  methodName: "GetHeight",
  service: RemotePhotinoServiceProto,
  requestStream: false,
  responseStream: false,
  requestType: remotephotino_pb.IdMessageRequest,
  responseType: remotephotino_pb.IntMessageResponse
};

RemotePhotinoServiceProto.SetHeight = {
  methodName: "SetHeight",
  service: RemotePhotinoServiceProto,
  requestStream: false,
  responseStream: false,
  requestType: remotephotino_pb.IntMessageRequest,
  responseType: google_protobuf_empty_pb.Empty
};

RemotePhotinoServiceProto.GetLeft = {
  methodName: "GetLeft",
  service: RemotePhotinoServiceProto,
  requestStream: false,
  responseStream: false,
  requestType: remotephotino_pb.IdMessageRequest,
  responseType: remotephotino_pb.IntMessageResponse
};

RemotePhotinoServiceProto.SetLeft = {
  methodName: "SetLeft",
  service: RemotePhotinoServiceProto,
  requestStream: false,
  responseStream: false,
  requestType: remotephotino_pb.IntMessageRequest,
  responseType: google_protobuf_empty_pb.Empty
};

RemotePhotinoServiceProto.GetLocation = {
  methodName: "GetLocation",
  service: RemotePhotinoServiceProto,
  requestStream: false,
  responseStream: false,
  requestType: remotephotino_pb.IdMessageRequest,
  responseType: remotephotino_pb.PointMessageResponse
};

RemotePhotinoServiceProto.SetLocation = {
  methodName: "SetLocation",
  service: RemotePhotinoServiceProto,
  requestStream: false,
  responseStream: false,
  requestType: remotephotino_pb.PointMessageRequest,
  responseType: google_protobuf_empty_pb.Empty
};

RemotePhotinoServiceProto.GetMonitors = {
  methodName: "GetMonitors",
  service: RemotePhotinoServiceProto,
  requestStream: false,
  responseStream: false,
  requestType: remotephotino_pb.IdMessageRequest,
  responseType: remotephotino_pb.MonitorResponse
};

RemotePhotinoServiceProto.GetResizable = {
  methodName: "GetResizable",
  service: RemotePhotinoServiceProto,
  requestStream: false,
  responseStream: false,
  requestType: remotephotino_pb.IdMessageRequest,
  responseType: remotephotino_pb.BoolResponse
};

RemotePhotinoServiceProto.SetResizable = {
  methodName: "SetResizable",
  service: RemotePhotinoServiceProto,
  requestStream: false,
  responseStream: false,
  requestType: remotephotino_pb.BoolRequest,
  responseType: google_protobuf_empty_pb.Empty
};

RemotePhotinoServiceProto.GetScreenDpi = {
  methodName: "GetScreenDpi",
  service: RemotePhotinoServiceProto,
  requestStream: false,
  responseStream: false,
  requestType: remotephotino_pb.IdMessageRequest,
  responseType: remotephotino_pb.UInt32Response
};

RemotePhotinoServiceProto.SendMessage = {
  methodName: "SendMessage",
  service: RemotePhotinoServiceProto,
  requestStream: false,
  responseStream: false,
  requestType: remotephotino_pb.SendMessageRequest,
  responseType: google_protobuf_empty_pb.Empty
};

RemotePhotinoServiceProto.SetIconFile = {
  methodName: "SetIconFile",
  service: RemotePhotinoServiceProto,
  requestStream: false,
  responseStream: false,
  requestType: remotephotino_pb.SendMessageRequest,
  responseType: google_protobuf_empty_pb.Empty
};

RemotePhotinoServiceProto.Show = {
  methodName: "Show",
  service: RemotePhotinoServiceProto,
  requestStream: false,
  responseStream: false,
  requestType: remotephotino_pb.IdMessageRequest,
  responseType: google_protobuf_empty_pb.Empty
};

RemotePhotinoServiceProto.ShowMessage = {
  methodName: "ShowMessage",
  service: RemotePhotinoServiceProto,
  requestStream: false,
  responseStream: false,
  requestType: remotephotino_pb.ShowMessageRequest,
  responseType: google_protobuf_empty_pb.Empty
};

RemotePhotinoServiceProto.GetSize = {
  methodName: "GetSize",
  service: RemotePhotinoServiceProto,
  requestStream: false,
  responseStream: false,
  requestType: remotephotino_pb.IdMessageRequest,
  responseType: remotephotino_pb.SizeMessageResponse
};

RemotePhotinoServiceProto.SetSize = {
  methodName: "SetSize",
  service: RemotePhotinoServiceProto,
  requestStream: false,
  responseStream: false,
  requestType: remotephotino_pb.SizeMessageRequest,
  responseType: google_protobuf_empty_pb.Empty
};

RemotePhotinoServiceProto.GetTitle = {
  methodName: "GetTitle",
  service: RemotePhotinoServiceProto,
  requestStream: false,
  responseStream: false,
  requestType: remotephotino_pb.IdMessageRequest,
  responseType: remotephotino_pb.StringResponse
};

RemotePhotinoServiceProto.SetTitle = {
  methodName: "SetTitle",
  service: RemotePhotinoServiceProto,
  requestStream: false,
  responseStream: false,
  requestType: remotephotino_pb.StringRequest,
  responseType: google_protobuf_empty_pb.Empty
};

RemotePhotinoServiceProto.GetTop = {
  methodName: "GetTop",
  service: RemotePhotinoServiceProto,
  requestStream: false,
  responseStream: false,
  requestType: remotephotino_pb.IdMessageRequest,
  responseType: remotephotino_pb.IntMessageResponse
};

RemotePhotinoServiceProto.SetTop = {
  methodName: "SetTop",
  service: RemotePhotinoServiceProto,
  requestStream: false,
  responseStream: false,
  requestType: remotephotino_pb.IntMessageRequest,
  responseType: google_protobuf_empty_pb.Empty
};

RemotePhotinoServiceProto.GetTopmost = {
  methodName: "GetTopmost",
  service: RemotePhotinoServiceProto,
  requestStream: false,
  responseStream: false,
  requestType: remotephotino_pb.IdMessageRequest,
  responseType: remotephotino_pb.BoolResponse
};

RemotePhotinoServiceProto.SetTopmost = {
  methodName: "SetTopmost",
  service: RemotePhotinoServiceProto,
  requestStream: false,
  responseStream: false,
  requestType: remotephotino_pb.BoolRequest,
  responseType: google_protobuf_empty_pb.Empty
};

RemotePhotinoServiceProto.NavigateToLocalFile = {
  methodName: "NavigateToLocalFile",
  service: RemotePhotinoServiceProto,
  requestStream: false,
  responseStream: false,
  requestType: remotephotino_pb.FileMessageRequest,
  responseType: google_protobuf_empty_pb.Empty
};

RemotePhotinoServiceProto.NavigateToString = {
  methodName: "NavigateToString",
  service: RemotePhotinoServiceProto,
  requestStream: false,
  responseStream: false,
  requestType: remotephotino_pb.StringRequest,
  responseType: google_protobuf_empty_pb.Empty
};

RemotePhotinoServiceProto.NavigateToUrl = {
  methodName: "NavigateToUrl",
  service: RemotePhotinoServiceProto,
  requestStream: false,
  responseStream: false,
  requestType: remotephotino_pb.UrlMessageRequest,
  responseType: google_protobuf_empty_pb.Empty
};

RemotePhotinoServiceProto.WaitForExit = {
  methodName: "WaitForExit",
  service: RemotePhotinoServiceProto,
  requestStream: false,
  responseStream: false,
  requestType: remotephotino_pb.IdMessageRequest,
  responseType: google_protobuf_empty_pb.Empty
};

RemotePhotinoServiceProto.GetWidth = {
  methodName: "GetWidth",
  service: RemotePhotinoServiceProto,
  requestStream: false,
  responseStream: false,
  requestType: remotephotino_pb.IdMessageRequest,
  responseType: remotephotino_pb.IntMessageResponse
};

RemotePhotinoServiceProto.SetWidth = {
  methodName: "SetWidth",
  service: RemotePhotinoServiceProto,
  requestStream: false,
  responseStream: false,
  requestType: remotephotino_pb.IntMessageRequest,
  responseType: google_protobuf_empty_pb.Empty
};

RemotePhotinoServiceProto.CreateWebWindow = {
  methodName: "CreateWebWindow",
  service: RemotePhotinoServiceProto,
  requestStream: false,
  responseStream: true,
  requestType: remotephotino_pb.CreateWebWindowRequest,
  responseType: remotephotino_pb.WebMessageResponse
};

RemotePhotinoServiceProto.FileReader = {
  methodName: "FileReader",
  service: RemotePhotinoServiceProto,
  requestStream: true,
  responseStream: true,
  requestType: remotephotino_pb.FileReadRequest,
  responseType: remotephotino_pb.FileReadResponse
};

RemotePhotinoServiceProto.Shutdown = {
  methodName: "Shutdown",
  service: RemotePhotinoServiceProto,
  requestStream: false,
  responseStream: false,
  requestType: remotephotino_pb.IdMessageRequest,
  responseType: google_protobuf_empty_pb.Empty
};

exports.RemotePhotinoServiceProto = RemotePhotinoServiceProto;

function RemotePhotinoServiceProtoClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

RemotePhotinoServiceProtoClient.prototype.getHeight = function getHeight(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(RemotePhotinoServiceProto.GetHeight, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

RemotePhotinoServiceProtoClient.prototype.setHeight = function setHeight(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(RemotePhotinoServiceProto.SetHeight, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

RemotePhotinoServiceProtoClient.prototype.getLeft = function getLeft(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(RemotePhotinoServiceProto.GetLeft, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

RemotePhotinoServiceProtoClient.prototype.setLeft = function setLeft(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(RemotePhotinoServiceProto.SetLeft, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

RemotePhotinoServiceProtoClient.prototype.getLocation = function getLocation(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(RemotePhotinoServiceProto.GetLocation, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

RemotePhotinoServiceProtoClient.prototype.setLocation = function setLocation(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(RemotePhotinoServiceProto.SetLocation, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

RemotePhotinoServiceProtoClient.prototype.getMonitors = function getMonitors(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(RemotePhotinoServiceProto.GetMonitors, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

RemotePhotinoServiceProtoClient.prototype.getResizable = function getResizable(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(RemotePhotinoServiceProto.GetResizable, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

RemotePhotinoServiceProtoClient.prototype.setResizable = function setResizable(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(RemotePhotinoServiceProto.SetResizable, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

RemotePhotinoServiceProtoClient.prototype.getScreenDpi = function getScreenDpi(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(RemotePhotinoServiceProto.GetScreenDpi, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

RemotePhotinoServiceProtoClient.prototype.sendMessage = function sendMessage(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(RemotePhotinoServiceProto.SendMessage, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

RemotePhotinoServiceProtoClient.prototype.setIconFile = function setIconFile(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(RemotePhotinoServiceProto.SetIconFile, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

RemotePhotinoServiceProtoClient.prototype.show = function show(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(RemotePhotinoServiceProto.Show, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

RemotePhotinoServiceProtoClient.prototype.showMessage = function showMessage(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(RemotePhotinoServiceProto.ShowMessage, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

RemotePhotinoServiceProtoClient.prototype.getSize = function getSize(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(RemotePhotinoServiceProto.GetSize, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

RemotePhotinoServiceProtoClient.prototype.setSize = function setSize(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(RemotePhotinoServiceProto.SetSize, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

RemotePhotinoServiceProtoClient.prototype.getTitle = function getTitle(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(RemotePhotinoServiceProto.GetTitle, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

RemotePhotinoServiceProtoClient.prototype.setTitle = function setTitle(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(RemotePhotinoServiceProto.SetTitle, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

RemotePhotinoServiceProtoClient.prototype.getTop = function getTop(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(RemotePhotinoServiceProto.GetTop, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

RemotePhotinoServiceProtoClient.prototype.setTop = function setTop(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(RemotePhotinoServiceProto.SetTop, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

RemotePhotinoServiceProtoClient.prototype.getTopmost = function getTopmost(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(RemotePhotinoServiceProto.GetTopmost, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

RemotePhotinoServiceProtoClient.prototype.setTopmost = function setTopmost(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(RemotePhotinoServiceProto.SetTopmost, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

RemotePhotinoServiceProtoClient.prototype.navigateToLocalFile = function navigateToLocalFile(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(RemotePhotinoServiceProto.NavigateToLocalFile, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

RemotePhotinoServiceProtoClient.prototype.navigateToString = function navigateToString(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(RemotePhotinoServiceProto.NavigateToString, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

RemotePhotinoServiceProtoClient.prototype.navigateToUrl = function navigateToUrl(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(RemotePhotinoServiceProto.NavigateToUrl, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

RemotePhotinoServiceProtoClient.prototype.waitForExit = function waitForExit(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(RemotePhotinoServiceProto.WaitForExit, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

RemotePhotinoServiceProtoClient.prototype.getWidth = function getWidth(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(RemotePhotinoServiceProto.GetWidth, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

RemotePhotinoServiceProtoClient.prototype.setWidth = function setWidth(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(RemotePhotinoServiceProto.SetWidth, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

RemotePhotinoServiceProtoClient.prototype.createWebWindow = function createWebWindow(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(RemotePhotinoServiceProto.CreateWebWindow, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

RemotePhotinoServiceProtoClient.prototype.fileReader = function fileReader(metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.client(RemotePhotinoServiceProto.FileReader, {
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport
  });
  client.onEnd(function (status, statusMessage, trailers) {
    listeners.status.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners.end.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners = null;
  });
  client.onMessage(function (message) {
    listeners.data.forEach(function (handler) {
      handler(message);
    })
  });
  client.start(metadata);
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    write: function (requestMessage) {
      client.send(requestMessage);
      return this;
    },
    end: function () {
      client.finishSend();
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

RemotePhotinoServiceProtoClient.prototype.shutdown = function shutdown(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(RemotePhotinoServiceProto.Shutdown, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.RemotePhotinoServiceProtoClient = RemotePhotinoServiceProtoClient;

var BrowserIPC = (function () {
  function BrowserIPC() {}
  BrowserIPC.serviceName = "photinonet.BrowserIPC";
  return BrowserIPC;
}());

BrowserIPC.ReceiveMessage = {
  methodName: "ReceiveMessage",
  service: BrowserIPC,
  requestStream: false,
  responseStream: true,
  requestType: remotephotino_pb.IdMessageRequest,
  responseType: remotephotino_pb.StringRequest
};

BrowserIPC.SendMessage = {
  methodName: "SendMessage",
  service: BrowserIPC,
  requestStream: false,
  responseStream: false,
  requestType: remotephotino_pb.StringRequest,
  responseType: google_protobuf_empty_pb.Empty
};

BrowserIPC.GetHeight = {
  methodName: "GetHeight",
  service: BrowserIPC,
  requestStream: false,
  responseStream: false,
  requestType: remotephotino_pb.IdMessageRequest,
  responseType: remotephotino_pb.IntMessageResponse
};

exports.BrowserIPC = BrowserIPC;

function BrowserIPCClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

BrowserIPCClient.prototype.receiveMessage = function receiveMessage(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(BrowserIPC.ReceiveMessage, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

BrowserIPCClient.prototype.sendMessage = function sendMessage(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(BrowserIPC.SendMessage, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

BrowserIPCClient.prototype.getHeight = function getHeight(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(BrowserIPC.GetHeight, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.BrowserIPCClient = BrowserIPCClient;

var ClientIPC = (function () {
  function ClientIPC() {}
  ClientIPC.serviceName = "photinonet.ClientIPC";
  return ClientIPC;
}());

ClientIPC.GetClients = {
  methodName: "GetClients",
  service: ClientIPC,
  requestStream: false,
  responseStream: true,
  requestType: google_protobuf_empty_pb.Empty,
  responseType: remotephotino_pb.ClientResponse
};

exports.ClientIPC = ClientIPC;

function ClientIPCClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

ClientIPCClient.prototype.getClients = function getClients(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(ClientIPC.GetClients, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

exports.ClientIPCClient = ClientIPCClient;


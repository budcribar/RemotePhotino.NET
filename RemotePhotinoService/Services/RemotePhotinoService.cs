using Google.Protobuf.WellKnownTypes;
using Grpc.Core;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using PhotinoNET;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Channels;
using System.Threading.Tasks;

namespace PeakSWC.RemotePhotinoNET
{
    public class RemotePhotinoService : RemotePhotinoServiceProto.RemotePhotinoServiceProtoBase
    {
        private readonly ConcurrentDictionary<string, ServiceState> _webWindowDictionary;
        private readonly ConcurrentDictionary<string, IPC> _ipc;
        private readonly ConcurrentDictionary<string, byte[]> _fileCache = new();
        private readonly ILogger<RemotePhotinoService> _logger;
        private readonly Channel<ClientResponse> _serviceStateChannel;

        public RemotePhotinoService(ILogger<RemotePhotinoService> logger, ConcurrentDictionary<string, ServiceState> rootDictionary, ConcurrentDictionary<string, IPC> ipc, Channel<ClientResponse> serviceStateChannel)
        {
            _logger = logger;
            this._webWindowDictionary = rootDictionary;
            this._ipc = ipc;
            _serviceStateChannel = serviceStateChannel;
        }
        private void ExShutdown(string id)
        {
            _logger.LogInformation("Shutting down..." + id);

            ServiceState? ss = new();
            if (_webWindowDictionary.ContainsKey(id))
                _webWindowDictionary.Remove(id, out ss);

            if (_ipc.ContainsKey(id))
                _ipc.Remove(id, out var _);

            _serviceStateChannel.Writer.WriteAsync(new ClientResponse { AddClient = false, Id=id });
        }
        public override async Task FileReader(IAsyncStreamReader<FileReadRequest> requestStream, IServerStreamWriter<FileReadResponse> responseStream, ServerCallContext context)
        {
            var id = "";
            try
            {
                await foreach (var message in requestStream.ReadAllAsync())
                {
                    if (message.Path == "Initialize")
                    {
                        id = message.Id;
                        var task = Task.Run(async () =>
                        {
                            while (true)
                            {
                                var file = await _webWindowDictionary[id].FileCollection.Reader.ReadAsync();
                                {
                                    
                                    await responseStream.WriteAsync(new FileReadResponse { Id = id, Path = file });
                                    
                                }
                            }

                        });

                    }
                    else
                    {
                        var bytes = message.Data.ToArray();
                        var resetEvent = _webWindowDictionary[message.Id].FileDictionary[message.Path].resetEvent;
                        _webWindowDictionary[message.Id].FileDictionary[message.Path] = (new MemoryStream(bytes), resetEvent);
                        resetEvent.Set();

                        // TODO Further identify file by hash
                        _fileCache.TryAdd(message.Path, bytes);
                    }
                }
            }
            catch (Exception)
            {
                ExShutdown(id);

                // Client has shut down
            }
        }
        public override async Task CreateWebWindow(CreateWebWindowRequest request, IServerStreamWriter<WebMessageResponse> responseStream, ServerCallContext context)
        {
            Debug.WriteLine($"https://localhost/app?guid={request.Id}");
            if (!_webWindowDictionary.ContainsKey(request.Id))
            {
                ServiceState state = new()
                {
                    HtmlHostPath = request.HtmlHostPath,
                    Hostname = request.Hostname,
                };
                await _serviceStateChannel.Writer.WriteAsync(new ClientResponse { AddClient = true, Id = request.Id, HostName = request.Hostname, Url= $"https://localhost/app?guid={request.Id}" });

                if (!_ipc.ContainsKey(request.Id)) _ipc.TryAdd(request.Id, new IPC());
                _ipc[request.Id].ResponseStream = responseStream;

                _webWindowDictionary.TryAdd(request.Id, state);

                await responseStream.WriteAsync(new WebMessageResponse { Response = "created:" });

                while (!context.CancellationToken.IsCancellationRequested)
                {
                    await Task.Delay(1000);
                }
            }
        }

        public override Task<Empty> Shutdown(IdMessageRequest request, ServerCallContext context)
        {
            ExShutdown(request.Id);
            return Task.FromResult<Empty>(new Empty());
        }

        public override Task<Empty> SendMessage(SendMessageRequest request, ServerCallContext context)
        {
            _ipc[request.Id].SendMessage(request.Message);
            return Task.FromResult<Empty>(new Empty());
        }

        public override Task<Empty> NavigateToUrl(UrlMessageRequest request, ServerCallContext context)
        {
            return Task.FromResult<Empty>(new Empty());
        }

        public override Task<Empty> Show(IdMessageRequest request, ServerCallContext context)
        {
            return Task.FromResult<Empty>(new Empty());
        }

    }
}

using Google.Protobuf.WellKnownTypes;
using Grpc.Core;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using PhotinoNET;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeakSWC.RemotePhotinoNET
{
    public class RemotePhotinoService : RemotePhotinoServiceProto.RemotePhotinoServiceProtoBase
    {
        private readonly ConcurrentDictionary<string, ServiceState> _webWindowDictionary;
        private readonly ConcurrentDictionary<string, IPC> _ipc;
        private readonly ConcurrentDictionary<string, byte[]> _fileCache = new();
        private readonly ILogger<RemotePhotinoService> _logger;

        public RemotePhotinoService(ILogger<RemotePhotinoService> logger)
        {
            _logger = logger;
        }
        private void ExShutdown(string id)
        {
            _logger.LogInformation("Shutting down..." + id);

            if (_webWindowDictionary.ContainsKey(id))
                _webWindowDictionary.Remove(id, out var _);

            if (_ipc.ContainsKey(id))
                _ipc.Remove(id, out var _);
        }

        public override async Task CreateWebWindow(CreateWebWindowRequest request, IServerStreamWriter<WebMessageResponse> responseStream, ServerCallContext context)
        {
           
            if (!_webWindowDictionary.ContainsKey(request.Id))
            {
                ServiceState state = new()
                {
                    HtmlHostPath = request.HtmlHostPath,
                    Hostname = request.Hostname,
                };

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
            return base.NavigateToUrl(request, context);
        }

    }
}

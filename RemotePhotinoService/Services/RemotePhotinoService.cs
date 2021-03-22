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

        public override async Task CreateWebWindow(CreateWebWindowRequest request, IServerStreamWriter<WebMessageResponse> responseStream, ServerCallContext context)
        {
            Guid id = Guid.Parse(request.Id);
            if (!_webWindowDictionary.ContainsKey(id.ToString()))
            {
                // TODO Other options
                PhotinoWindow webWindow = new PhotinoWindow(request.Title);

                webWindow.WebMessageReceived += async (sender, message) =>
                {
                    await responseStream.WriteAsync(new WebMessageResponse { Response = "webmessage:" + message });
                };

                webWindow.LocationChanged += async (sender, point) =>
                {
                    await responseStream.WriteAsync(new WebMessageResponse { Response = "location:" + JsonConvert.SerializeObject(point) });
                };

                webWindow.SizeChanged += async (sender, size) =>
                {
                    await responseStream.WriteAsync(new WebMessageResponse { Response = "size:" + JsonConvert.SerializeObject(size) }); ;
                };

                // TODO
                //_webWindowDictionary.TryAdd(id.ToString(), webWindow);

                await responseStream.WriteAsync(new WebMessageResponse { Response = "created:" });

                while (!context.CancellationToken.IsCancellationRequested)
                {
                    await Task.Delay(1000);

                }
            }
        }



    }
}

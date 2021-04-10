using System.Threading.Tasks;
using Grpc.Core;
using Microsoft.Extensions.Logging;
using System.Threading;
using System;
using System.Collections.Concurrent;
using Google.Protobuf.WellKnownTypes;

namespace PeakSWC.RemotePhotinoNET
{
    public class BrowserIPCService : BrowserIPC.BrowserIPCBase
    {
        private readonly ILogger<BrowserIPCService> _logger;
        public ConcurrentDictionary<string, IPC> IPC { get; set; }
        private volatile bool shutdown = false;

        public BrowserIPCService(ILogger<BrowserIPCService> logger, ConcurrentDictionary<string, IPC> ipc)
        {
            _logger = logger;
            
            IPC = ipc;
        }

        public void Shutdown()
        {
            _logger.LogInformation("Shutting down.");
            shutdown = true;
        }

        public override Task ReceiveMessage(IdMessageRequest request, IServerStreamWriter<StringRequest> responseStream, ServerCallContext context)
        {
            Guid id = Guid.Parse(request.Id);
            if (!IPC.ContainsKey(id.ToString())) IPC.TryAdd(id.ToString(),new IPC());
            IPC[id.ToString()].BrowserResponseStream = responseStream;

            // TODO

            while (!shutdown)
                Thread.Sleep(1000);

            return Task.CompletedTask;
        }

        public override Task<Empty> SendMessage(StringRequest request, ServerCallContext context)
        {
            Guid id = Guid.Parse(request.Id);
            if (!IPC.ContainsKey(id.ToString())) IPC.TryAdd(id.ToString(), new IPC());
            IPC[id.ToString()].ReceiveMessage(request.Request);

            return Task.FromResult<Empty>(new Empty());
        }


    }
}

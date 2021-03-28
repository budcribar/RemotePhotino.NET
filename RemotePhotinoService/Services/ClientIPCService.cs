using System.Threading.Tasks;
using Grpc.Core;
using Microsoft.Extensions.Logging;
using System.Threading;
using System;
using System.Collections.Concurrent;
using Google.Protobuf.WellKnownTypes;

namespace PeakSWC.RemotePhotinoNET
{
    public class ClientIPCService
    {
        private readonly ILogger<ClientIPCService> _logger;
        public ConcurrentDictionary<Guid, IPC> IPC { get; set; }
        private volatile bool shutdown = false;

        public ClientIPCService(ILogger<ClientIPCService> logger, ConcurrentDictionary<Guid, IPC> ipc)
        {
            _logger = logger;
            
            IPC = ipc;
        }

     
       

    }
}

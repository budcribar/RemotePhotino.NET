using System.Threading.Tasks;
using Grpc.Core;
using Microsoft.Extensions.Logging;
using System.Threading;
using System;
using System.Collections.Concurrent;
using Google.Protobuf.WellKnownTypes;
using System.Threading.Channels;

namespace PeakSWC.RemotePhotinoNET
{
    public class ClientIPCService : ClientIPC.ClientIPCBase
    {
        private readonly ILogger<ClientIPCService> _logger;
        private Channel<ClientResponse> _serviceStateChannel;

        public ClientIPCService(ILogger<ClientIPCService> logger, Channel<ClientResponse> serviceStateChannel)
        {
            _logger = logger;

            _serviceStateChannel = serviceStateChannel;
        }

        public override async Task GetClients(Empty request, IServerStreamWriter<ClientResponse> responseStream, ServerCallContext context)
        {
            await foreach (var state in _serviceStateChannel.Reader.ReadAllAsync())
            {
                await responseStream.WriteAsync(state);
            }
        }


    }
}

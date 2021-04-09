using System.Collections.Concurrent;
using System.ComponentModel;
using System.IO;
using System.Threading;
using System.Threading.Channels;
namespace System.Runtime.CompilerServices
{
    // TODO This is a bug in compiler
    [EditorBrowsable(EditorBrowsableState.Never)]
    public class IsExternalInit { }
}
namespace PeakSWC.RemotePhotinoNET
{
    public class ServiceState
    {
        public string HtmlHostPath { get; init; } = string.Empty;
        public string Hostname { get; init; } = string.Empty;
        public bool InUse { get; set; }
        public ConcurrentDictionary<string, (MemoryStream? stream, ManualResetEventSlim resetEvent)> FileDictionary { get; set; } = new ();
        public Channel<string> FileCollection { get; set; } = Channel.CreateUnbounded<string>();
    }
}

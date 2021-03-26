using PeakSWC.RemotePhotinoNET;
using Photino.Blazor;
using System;

namespace HelloRemotePhotino.Blazor
{
    public class Program
    {
        [STAThread]
        static void Main(string[] args)
        {
            ComponentsDesktop.Run<Startup>(new RemotePhotinoWindow(new Uri("https://localhost:443"), "wwwroot/index.html", "Hello Remote Photino Blazor!"));
        }
    }
}

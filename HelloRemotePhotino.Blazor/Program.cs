using Microsoft.JSInterop;
using PeakSWC.RemotePhotinoNET;
using Photino.Blazor;
using System;
using System.Linq;
using System.Reflection;

namespace HelloRemotePhotino.Blazor
{
    public class Program
    {
        [STAThread]
        static void Main(string[] args)
        {
            var pw = new RemotePhotinoWindow(new Uri("https://localhost:443"), "wwwroot/index.html", "Hello Remote Photino Blazor!");
            ComponentsDesktop.Run<Startup>(pw);
            pw.JSRuntime = typeof(ComponentsDesktop).GetProperties(BindingFlags.Static | BindingFlags.NonPublic).Where(x => x.Name == "DesktopJSRuntime").FirstOrDefault()?.GetGetMethod(true)?.Invoke(null, null) as IJSRuntime;

        }
    }
}

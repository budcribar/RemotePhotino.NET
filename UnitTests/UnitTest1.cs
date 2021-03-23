using Microsoft.VisualStudio.TestTools.UnitTesting;
using PeakSWC.RemotePhotinoNET;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace UnitTests
{
    [TestClass]
    public class UnitTest1
    {
        private static Process process;
        private static List<Process> clients;

        [TestMethod]
        public void TestMethod1()
        {
            RemotePhotinoWindow rpw = new RemotePhotinoWindow(new Uri(@"https://localhost:443"),"index.html", "Title");
            rpw.WindowCreating += Rpw_WindowCreating;

            Assert.IsNotNull(rpw);
            rpw.SendWebMessage("created:");

            Task.Delay(2000);
        }

        private void Rpw_WindowCreating(object sender, System.EventArgs e)
        {
            int x = 3;
        }

        [TestInitialize]
        public void Setup()
        {
            StartServer();
        }
        public static void StartServer()
        {
            const string ServiceName = "RemotePhotinoService";
            Stopwatch sw = new Stopwatch();
            sw.Start();

            Process.GetProcesses().FirstOrDefault(p => p.ProcessName == ServiceName)?.Kill();
            var relative = @"..\..\..\..\" + ServiceName ;
            var executable = @"bin\debug\netcoreapp3.1\" + ServiceName + ".exe";
            var f = Path.Combine(Directory.GetCurrentDirectory(), relative, executable);

            process = new Process();
            process.StartInfo.FileName = Path.GetFullPath(f);
            process.StartInfo.UseShellExecute = true;

            process.Start();
            
            Console.WriteLine($"Started server in {sw.Elapsed}");
        }
    }
}

using Microsoft.VisualStudio.TestTools.UnitTesting;
using PeakSWC.RemotePhotinoNET;

namespace UnitTests
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestMethod1()
        {
            RemotePhotinoWindow rpw = new RemotePhotinoWindow("Title");

            Assert.IsNotNull(rpw);
            Assert.AreEqual(800, rpw.Height);
        }
    }
}

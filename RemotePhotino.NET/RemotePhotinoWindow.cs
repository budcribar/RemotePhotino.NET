using PhotinoNET.Structs;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading;
using Grpc.Core;
using Grpc.Net.Client;
using Google.Protobuf;
using PhotinoNET;
using System.Threading.Tasks;
using System.Reflection;
using System.Net;

namespace PeakSWC.RemotePhotinoNET
{
    public class RemotePhotinoWindow : IPhotinoWindow, IDisposable
    {
        private RemotePhotinoServiceProto.RemotePhotinoServiceProtoClient? client = null;
        private readonly Uri uri;
        private readonly CancellationTokenSource cts = new CancellationTokenSource();
        private readonly string windowTitle;
        private readonly string hostHtmlPath;
        private readonly string hostname;
        private readonly object bootLock = new object();

        private Func<string, Stream?> FrameworkFileResolver { get; } = SupplyFrameworkFile;

        public Guid Id { get; set; }

        // EventHandlers
        public event EventHandler WindowCreating;
        public event EventHandler WindowCreated;
        public event EventHandler WindowClosing;
        public event EventHandler<Size> SizeChanged;
        public event EventHandler<Point> LocationChanged;
        public event EventHandler<string> WebMessageReceived;

        public static Stream? SupplyFrameworkFile(string uri)
        {
            try
            {
                // TODO
                if (Path.GetFileName(uri) == "remote.blazor.desktop.js")
                    return Assembly.GetExecutingAssembly().GetManifestResourceStream("PeakSwc.RemoteableWebWindows.remote.blazor.desktop.js");

                if (File.Exists(uri))
                    return File.OpenRead(uri);
            }
            catch (Exception) { return null; }

            return null;
        }

        private RemotePhotinoServiceProto.RemotePhotinoServiceProtoClient Client
        {
            get
            {
                if (client == null)
                {
                    var channel = GrpcChannel.ForAddress(uri);

                    client = new RemotePhotinoServiceProto.RemotePhotinoServiceProtoClient(channel);
                    var events = client.CreateWebWindow(new CreateWebWindowRequest { Id = Id.ToString(), HtmlHostPath = hostHtmlPath, Hostname = hostname }, cancellationToken: cts.Token); // TODO parameter names
                    var completed = new ManualResetEventSlim();

                    Task.Run(async () =>
                    {
                        try
                        {
                            await foreach (var message in events.ResponseStream.ReadAllAsync())
                            {
                                var command = message.Response.Split(':')[0];
                                var data = message.Response.Substring(message.Response.IndexOf(':') + 1);

                                switch (command)
                                {
                                    case "created":
                                        completed.Set();
                                        break;
                                    case "webmessage":
                                        if (data == "booted:")
                                        {
                                            lock (bootLock)
                                            {
                                                Shutdown();
                                                WindowClosing?.Invoke(this, new());
                                            }
                                        }
                                        else if (data == "connected:")
                                            WindowCreated?.Invoke(this,new());

                                        else
                                            OnWebMessageReceived(data);
                                        break;


                                }

                            }
                        }
                        catch (RpcException ex) when (ex.StatusCode == StatusCode.Cancelled)
                        {
                            OnWindowClosing();
                            Console.WriteLine("Stream cancelled.");  //TODO
                        }
                    }, cts.Token);

                    completed.Wait();

                    Task.Run(async () =>
                    {
                        var files = client.FileReader();

                        await files.RequestStream.WriteAsync(new FileReadRequest { Id = Id.ToString(), Path = "Initialize" });

                        await foreach (var message in files.ResponseStream.ReadAllAsync())
                        {
                            var bytes = FrameworkFileResolver(message.Path) ?? null;
                            await files.RequestStream.WriteAsync(new FileReadRequest { Id = Id.ToString(), Path = message.Path, Data = bytes == null ? null : ByteString.FromStream(bytes) });
                        }

                    }, cts.Token);

                }
                return client;
            }
        }

        private void Shutdown()
        {
            Client.Shutdown(new IdMessageRequest { Id = Id.ToString() });
        }

        /// <summary>
        /// Send a message to the window's JavaScript context.
        /// </summary>
        /// <param name="message">The message to send.</param>
        /// <returns>The current IPhotinoWindow instance.</returns>
        public IPhotinoWindow SendWebMessage(string message)
        {
            if (this.LogVerbosity > 1)
                Console.WriteLine($"Executing: \"{this.Title ?? "RemotePhotinoWindow"}\".SendWebMessage(string message)");

            Client.SendMessage(new SendMessageRequest { Id = Id.ToString(), Message = message }, new());

            return this;
        }

        public IntPtr WindowHandle => throw new NotImplementedException();
       
        public IPhotinoWindow Parent => throw new NotImplementedException();

        public List<IPhotinoWindow> Children { get; } = new();
       

        #region TODO

        //private readonly IntPtr _nativeInstance;
        //private readonly int _managedThreadId;
        //private readonly List<GCHandle> _gcHandlesToFree = new List<GCHandle>();
        //private readonly List<IntPtr> _hGlobalToFree = new List<IntPtr>();

        // Internal State
        private Size _lastSize;
        private Point _lastLocation;

        // API Members
       
       

      

        private string _title;
        public string Title
        {
            get => _title;
            set
            {
                if (string.IsNullOrEmpty(value.Trim()))
                {
                    value = "Untitled Window";
                }

                // Due to Linux/Gtk platform limitations, the window title has to be no more than 31 chars
                if (value.Length > 31 && IsLinuxPlatform)
                {
                    value = value.Substring(0, 31);
                }

                _title = value;
            }
        }

        private bool _resizable = true;
        public bool Resizable
        {
            get => _resizable;
            set
            {
                if (_resizable != value)
                {
                    _resizable = value;
                    //Invoke(() => Photino_SetResizable(_nativeInstance, _resizable ? 1 : 0));
                }
            }
        }

        public Size Size
        {
            get
            {
                //Photino_GetSize(_nativeInstance, out _width, out _height);
                return new Size(_width, _height);
            }
            set
            {
                // ToDo:
                // Should this be locked if _isResizable == false?
                if (_width != value.Width || _height != value.Height)
                {
                    _width = value.Width;
                    _height = value.Height;

                    //Invoke(() => Photino_SetSize(_nativeInstance, _width, _height));
                }
            }
        }

        private int _width;
        public int Width
        {
            get => this.Size.Width;
            set
            {
                Size currentSize = this.Size;

                if (currentSize.Width != value)
                {
                    _width = value;
                    this.Size = new Size(_width, currentSize.Height);
                }
            }
        }

        private int _height;
        public int Height
        {
            get => this.Size.Height;
            set
            {
                Size currentSize = this.Size;

                if (currentSize.Height != value)
                {
                    _height = value;
                    this.Size = new Size(currentSize.Width, _height);
                }
            }
        }

        public Point Location
        {
            get
            {
                //Photino_GetPosition(_nativeInstance, out _left, out _top);
                return new Point(_left, _top);
            }
            set
            {
                if (_left != value.X || _top != value.Y)
                {
                    _left = value.X;
                    _top = value.Y;

                    //Invoke(() => Photino_SetPosition(_nativeInstance, _left, _top));
                }
            }
        }

        private int _left;
        public int Left
        {
            get => this.Location.X;
            set
            {
                Point currentLocation = this.Location;

                if (currentLocation.X != value)
                {
                    _left = value;
                    this.Location = new Point(_left, currentLocation.Y);
                }
            }
        }

        private int _top;
        public int Top
        {
            get => this.Location.Y;
            set
            {
                Point currentLocation = this.Location;

                if (currentLocation.Y != value)
                {
                    _top = value;
                    this.Location = new Point(currentLocation.X, _left);
                }
            }
        }

        private int _logVerbosity;
        ///<summary>0 = Critical Only, 1 = Critical and Warning, 2 = Verbose, >2 = All Details</summary>
        public int LogVerbosity
        {
            get => _logVerbosity;
            set { _logVerbosity = value; }
        }

        public IReadOnlyList<PhotinoNET.Structs.Monitor> Monitors
        {
            get
            {
                List<PhotinoNET.Structs.Monitor> monitors = new List<PhotinoNET.Structs.Monitor>();

                //int callback(in NativeMonitor monitor)
                //{
                //    monitors.Add(new Structs.Monitor(monitor));
                //    return 1;
                //}

                //Photino_GetAllMonitors(_nativeInstance, callback);
                
                return monitors;
            }
        }
        public PhotinoNET.Structs.Monitor MainMonitor => this.Monitors.First();

        // Bug:
        // ScreenDpi is static in macOS's Photino.Native, at 72 dpi.
        public uint ScreenDpi => 0;// Photino_GetScreenDpi(_nativeInstance);

        private bool _onTop = false;
        public bool IsOnTop
        {
            get => _onTop;
            set
            {
                if (_onTop != value)
                {
                    _onTop = value;
                    //Invoke(() => Photino_SetTopmost(_nativeInstance, _onTop ? 1 : 0));
                }
            }
        }

        private bool _wasShown = false;
        public bool WasShown => _wasShown;

        // Static API Members
        public static bool IsWindowsPlatform => RuntimeInformation.IsOSPlatform(OSPlatform.Windows);
        public static bool IsMacOsPlatform => RuntimeInformation.IsOSPlatform(OSPlatform.OSX);
        public static bool IsLinuxPlatform => RuntimeInformation.IsOSPlatform(OSPlatform.Linux);

        

        IReadOnlyList<PhotinoNET.Structs.Monitor> IPhotinoWindow.Monitors => throw new NotImplementedException();

        PhotinoNET.Structs.Monitor IPhotinoWindow.MainMonitor => throw new NotImplementedException();

        

        //public event EventHandler<string> ;

        /// <summary>
        /// Creates a new PhotinoWindow instance with
        /// the supplied arguments. Register WindowCreating and
        /// WindowCreated handlers in the configure action, they
        /// are triggered in the constructor, whereas handlers
        /// that are registered otherwise will be triggered
        /// after the native PhotinoWindow instance was created.
        /// </summary>
        /// <param name="title">The window title</param>
        /// <param name="configure">PhotinoWindow options configuration</param>
        /// <param name="width">The window width</param>
        /// <param name="height">The window height</param>
        /// <param name="left">The position from the left side of the screen</param>
        /// <param name="top">The position from the top side of the screen</param>
        /// <param name="fullscreen">Open window in fullscreen mode</param>
        public RemotePhotinoWindow(
            Uri uri,
            string hostHtmlPath,
            string title,
            Guid id = default,
            Action<PhotinoWindowOptions>? configure = null,
            int width = 800,
            int height = 600,
            int left = 20,
            int top = 20,
            bool fullscreen = false)
        {
            this.uri = uri;
            this.Id = id == default(Guid) ? Guid.NewGuid() : id;
            this.hostHtmlPath = hostHtmlPath;
            this.hostname = Dns.GetHostName();

            //_managedThreadId = Thread.CurrentThread.ManagedThreadId;

            // Native Interop Events
            //var onClosingDelegate = (ClosingDelegate)this.OnClosing;
            //_gcHandlesToFree.Add(GCHandle.Alloc(onClosingDelegate));

            //var onSizedChangedDelegate = (SizeChangedDelegate)this.OnSizeChanged;
            //_gcHandlesToFree.Add(GCHandle.Alloc(onSizedChangedDelegate));

            //var onLocationChangedDelegate = (LocationChangedDelegate)this.OnLocationChanged;
            //_gcHandlesToFree.Add(GCHandle.Alloc(onLocationChangedDelegate));

            //var onWebMessageReceivedDelegate = (WebMessageReceivedDelegate)this.OnWebMessageReceived;
            //_gcHandlesToFree.Add(GCHandle.Alloc(onWebMessageReceivedDelegate));

            // Configure Photino instance
            var options = new PhotinoWindowOptions();
            configure?.Invoke(options);

            this.RegisterEventHandlersFromOptions(options);

            // Fire pre-create event handlers
            this.OnWindowCreating();

            // Create window
            this.Title = title;

            //_id = Guid.NewGuid();
            //_parent = options.Parent;
            //_nativeInstance = Photino_ctor(_title, (_parent as RemotePhotinoWindow)?._nativeInstance ?? default, onWebMessageReceivedDelegate, fullscreen, left, top, width, height);

            // Register handlers that depend on an existing
            // Photino.Native instance.
            foreach (var (scheme, handler) in options.CustomSchemeHandlers)
            {
                this.RegisterCustomSchemeHandler(scheme, handler);
            }

            //Invoke(() => Photino_SetResizedCallback(_nativeInstance, onSizedChangedDelegate));
            //Invoke(() => Photino_SetMovedCallback(_nativeInstance, onLocationChangedDelegate));
            //Invoke(() => Photino_SetClosingCallback(_nativeInstance, onClosingDelegate));

            // Manage parent / child relationship
            //if (_parent != null)
            //{
            //    this.Parent = _parent;
            //    this.Parent.AddChild(this);
            //}

            // Fire post-create event handlers
            this.OnWindowCreated();
        }

        /// <summary>
        /// PhotinoWindow Destructor
        /// </summary>
        ~RemotePhotinoWindow()
        {
            this.Dispose();
        }

        /// <summary>
        /// Dispatches an Action to the UI thread.
        /// </summary>
        /// <param name="workItem"></param>
        //private void Invoke(Action workItem)
        //{
        //    // If we're already on the UI thread, no need to dispatch
        //    if (Thread.CurrentThread.ManagedThreadId == _managedThreadId)
        //    {
        //        workItem();
        //    }
        //    else
        //    {
        //        //Photino_Invoke(_nativeInstance, workItem.Invoke);
        //    }
        //}

        // Does not get called when window is closed using
        // the UI close button of the window chrome.
        // Works when calling this.Close(). This might very
        // well not be the right way to do it. An interop
        // method is most likely needed to handle closing
        // and associated events.
        public void Dispose()
        {
            // Remove the window from a potential parent window.
            // Prevent disposal of child by marking the child
            // window as being in the process of being disposed.
            // This prevents the recursive execution of Dispose().
            this.Parent?.RemoveChild(this, true);

            // Make sure all children of a window get closed.
            this.Children
                .ToList()
                .ForEach(child => { child.Close(); });

            //Invoke(() => Photino_SetResizedCallback(_nativeInstance, null));
            //Invoke(() => Photino_SetMovedCallback(_nativeInstance, null));
            //Invoke(() => Photino_SetClosingCallback(_nativeInstance, null));

            //Photino_dtor(_nativeInstance);

            //foreach (var gcHandle in _gcHandlesToFree)
            //{
            //    gcHandle.Free();
            //}
            //_gcHandlesToFree.Clear();

            //foreach (var handle in _hGlobalToFree)
            //{
            //    Marshal.FreeHGlobal(handle);
            //}
            //_hGlobalToFree.Clear();
        }

        /// <summary>
        /// Adds a child IPhotinoWindow instance to the current instance.
        /// </summary>
        /// <param name="child">The IPhotinoWindow child instance to be added</param>
        /// <returns>The current IPhotinoWindow instance</returns>
        public IPhotinoWindow AddChild(IPhotinoWindow child)
        {
            if (this.LogVerbosity > 1)
                Console.WriteLine($"Executing: \"{this.Title ?? "PhotinoWindow"}\".AddChild(IPhotinoWindow child)");

            this.Children.Add(child);

            return this;
        }

        /// <summary>
        /// Removes a child IPhotinoWindow instance from the current instance.
        /// </summary>
        /// <param name="child">The IPhotinoWindow child instance to be removed</param>
        /// <returns>The current IPhotinoWindow instance</returns>
        public IPhotinoWindow RemoveChild(IPhotinoWindow child, bool childIsDisposing = false)
        {
            if (this.LogVerbosity > 1)
                Console.WriteLine($"Executing: \"{this.Title ?? "PhotinoWindow"}\".RemoveChild(IPhotinoWindow child)");

            this.Children.Remove(child);
            
            // Don't execute the Dispose method on a child
            // when it is already being disposed (this method
            // may be called from Dispose on child).
            if (childIsDisposing == false)
            {
                child.Dispose();
            }

            return this;
        }

        /// <summary>
        /// Removes a child IPhotinoWindow instance identified by its Id from the current instance.
        /// </summary>
        /// <param name="id">The Id of the IPhotinoWindow child instance to be removed</param>
        /// <returns>The current IPhotinoWindow instance</returns>
        public IPhotinoWindow RemoveChild(Guid id, bool childIsDisposing = false)
        {
            if (this.LogVerbosity > 1)
                Console.WriteLine($"Executing: \"{this.Title ?? "PhotinoWindow"}\".RemoveChild(Guid id)");

            IPhotinoWindow child = this.Children
                .FirstOrDefault(c => c.Id == id);

            return this.RemoveChild(child, childIsDisposing);
        }

        /// <summary>
        /// Set the window icon file
        /// </summary>
        /// <param name="path">The path to the icon file</param>
        /// <returns>The current IPhotinoWindow instance</returns>
        public IPhotinoWindow SetIconFile(string path)
        {
            if (this.LogVerbosity > 1)
                Console.WriteLine($"Executing: \"{this.Title ?? "PhotinoWindow"}\".SetIconFile(string path)");

            // ToDo:
            // Determine if Path.GetFullPath is always safe to use.
            // Perhaps it needs to be constrained to the application
            // root folder?
            //Invoke(() => Photino_SetIconFile(_nativeInstance, Path.GetFullPath(path)));

            return this;
        }

        /// <summary>
        /// Shows the current IPhotinoWindow instance window.
        /// </summary>
        /// <returns>The current IPhotinoWindow instance</returns>
        public IPhotinoWindow Show()
        {
            if (this.LogVerbosity > 1)
                Console.WriteLine($"Executing: \"{this.Title ?? "PhotinoWindow"}\".Show()");

            //Invoke(() => Photino_Show(_nativeInstance));

            // Is used to indicate that the window was
            // shown to the user at least once. Some
            // functionality like registering custom
            // scheme handlers can only be executed on
            // the native window before it was shown the
            // first time.
            _wasShown = true;

            return this;
        }

        /// <summary>
        /// Hides the current IPhotinoWindow instance window.
        /// </summary>
        /// <returns>The current IPhotinoWindow instance</returns>
        public IPhotinoWindow Hide()
        {
            if (this.LogVerbosity > 1)
                Console.WriteLine($"Executing: \"{this.Title ?? "PhotinoWindow"}\".Hide()");
            
            throw new NotImplementedException("Hide is not yet implemented in PhotinoNET.");
        }

        /// <summary>
        /// Closes the current IPhotinoWindow instance. Also closes
        /// all children of the current IPhotinoWindow instance.
        /// </summary>
        public void Close()
        {
            if (this.LogVerbosity > 1)
                Console.WriteLine($"Executing: \"{this.Title ?? "PhotinoWindow"}\".Close()");

            //Invoke(() => Photino_Close(_nativeInstance));
        }

        /// <summary>
        /// Wait for the current window to close and send exit
        /// signal to the native WebView instance.
        /// </summary>
        public void WaitForClose()
        {
            if (this.LogVerbosity > 1)
                Console.WriteLine($"Executing: \"{this.Title ?? "PhotinoWindow"}\".WaitForClose()");

            //Invoke(() => Photino_WaitForExit(_nativeInstance));
        }

        /// <summary>
        /// Sets whether the user can resize the current window or not.
        /// </summary>
        /// <param name="isResizable">Let user resize window</param>
        /// <returns>The current IPhotinoWindow instance</returns>
        public IPhotinoWindow UserCanResize(bool isResizable = true)
        {
            this.Resizable = isResizable;

            return this;
        }

        /// <summary>
        /// Resizes the current window instance using a Size struct.
        /// </summary>
        /// <param name="size">The Size struct for the window containing width and height</param>
        /// <returns>The current IPhotinoWindow instance</returns>
        public IPhotinoWindow Resize(Size size)
        {
            if (this.LogVerbosity > 1)
                Console.WriteLine($"Executing: \"{this.Title ?? "PhotinoWindow"}\".Resize(Size size)");

            if (LogVerbosity > 2)
            {
                Console.WriteLine($"Current size: {this.Size}");
                Console.WriteLine($"New size: {size}");
            }

            // Save last size
            _lastSize = this.Size;

            // Don't allow window size values smaller than 0px
            if (size.Width <= 0 || size.Height <= 0)
            {
                throw new ArgumentOutOfRangeException($"Window width and height must be greater than 0. (Invalid Size: {size}.)");
            }

            // Don't allow window to be bigger than work area
            Size workArea = this.MainMonitor.WorkArea.Size;
            size = new Size(
                size.Width <= workArea.Width ? size.Width :  workArea.Width,
                size.Height <= workArea.Height ? size.Height : workArea.Height
            );

            this.Size = size;

            return this;
        }

        /// <summary>
        /// Resizes the current window instance using width and height.
        /// </summary>
        /// <param name="width">The width for the window</param>
        /// <param name="height">The height for the window</param>
        /// <param name="unit">Unit of the given dimensions: px (default), %, percent</param>
        /// <returns>The current IPhotinoWindow instance</returns>
        public IPhotinoWindow Resize(int width, int height, string unit = "px")
        {
            if (this.LogVerbosity > 1)
                Console.WriteLine($"Executing: \"{this.Title ?? "PhotinoWindow"}\".Resize(int width, int height, bool isPercentage)");

            Size size;

            switch (unit) {
                case "px":
                case "pixel":
                    size = new Size(width, height);

                    break;
                case "%":
                case "percent":
                case "percentage":
                    // Check if the given values are in range. Prevents divide by zero.
                    if (width < 1 || width > 100)
                    {
                        throw new ArgumentOutOfRangeException("Resize width % must be between 1 and 100.");
                    }
                    
                    if (height < 1 || height > 100)
                    {
                        throw new ArgumentOutOfRangeException("Resize height % must be between 1 and 100.");
                    }

                    // Calculate window size based on main monitor work area
                    size = new Size();
                    size.Width = (int)Math.Round((decimal)(this.MainMonitor.WorkArea.Width / 100 * width), 0);
                    size.Height = (int)Math.Round((decimal)(this.MainMonitor.WorkArea.Height / 100 * height), 0);

                    break;
                default:
                    throw new ArgumentException($"Unit \"{unit}\" is not a valid unit for window resize.");
            }
            
            return this.Resize(size);
        }

        /// <summary>
        /// Minimizes the window into the system tray.
        /// </summary>
        /// <returns>The current IPhotinoWindow instance</returns>
        public IPhotinoWindow Minimize()
        {
            if (this.LogVerbosity > 1)
                Console.WriteLine($"Executing: \"{this.Title ?? "PhotinoWindow"}\".Minimize()");
            
            throw new NotImplementedException("Minimize is not yet implemented in PhotinoNET.");
        }

        /// <summary>
        /// Maximizes the window to fill the work area.
        /// </summary>
        /// <returns>The current IPhotinoWindow instance</returns>
        public IPhotinoWindow Maximize()
        {
            if (this.LogVerbosity > 1)
                Console.WriteLine($"Executing: \"{this.Title ?? "PhotinoWindow"}\".Maximize()");

            Size workArea = this.MainMonitor.WorkArea.Size;

            return this
                .MoveTo(0, 0)
                .Resize(workArea.Width, workArea.Height);
        }


        /// <summary>
        /// Makes the window fill the whole screen area 
        /// without borders or OS interface.
        /// </summary>
        /// <returns>The current IPhotinoWindow instance</returns>
        public IPhotinoWindow Fullscreen()
        {
            if (this.LogVerbosity > 1)
                Console.WriteLine($"Executing: \"{this.Title ?? "PhotinoWindow"}\".Fullscreen()");
            
            throw new NotImplementedException("Fullscreen is not yet implemented in PhotinoNET.");
        }

        /// <summary>
        /// Restores the previous window size and position.
        /// </summary>
        /// <returns>The current IPhotinoWindow instance</returns>
        public IPhotinoWindow Restore()
        {
            if (this.LogVerbosity > 1)
                Console.WriteLine($"Executing: \"{this.Title ?? "PhotinoWindow"}\".Restore()");

            if (LogVerbosity > 2)
            {
                Console.WriteLine($"Last location: {_lastLocation}");
                Console.WriteLine($"Last size: {_lastSize}");
            }

            bool isRestorable = _lastSize.Width > 0 && _lastSize.Height > 0;

            if (isRestorable == false)
            {
                if (LogVerbosity > 0)
                    Console.WriteLine("Can't restore previous window state.");
                return this;
            }

            return this
                .Resize(_lastSize)
                .MoveTo(_lastLocation, true); // allow moving to outside work area in case the previous window Rect was outside.
        }

        /// <summary>
        /// Moves the window to the specified location 
        /// on the screen using a Point struct.
        /// </summary>
        /// <param name="location">The Point struct defining the window location</param>
        /// <param name="allowOutsideWorkArea">Allow the window to move outside the work area of the monitor</param>
        /// <returns>The current IPhotinoWindow instance</returns>
        public IPhotinoWindow MoveTo(Point location, bool allowOutsideWorkArea = false)
        {
            if (this.LogVerbosity > 1)
                Console.WriteLine($"Executing: \"{this.Title ?? "PhotinoWindow"}\".Move(Point location)");

            if (LogVerbosity > 2)
            {
                Console.WriteLine($"Current location: {this.Location}");
                Console.WriteLine($"New location: {location}");
            }

            // Save last location
            _lastLocation = this.Location;

            // Check if the window is within the work area.
            // If the window is outside of the work area,
            // recalculate the position and continue.
            if (allowOutsideWorkArea == false)
            {
                int horizontalWindowEdge = location.X + this.Width; // x position + window width
                int verticalWindowEdge = location.Y + this.Height; // y position + window height

                int horizontalWorkAreaEdge = this.MainMonitor.WorkArea.Width; // like 1920 (px)
                int verticalWorkAreaEdge = this.MainMonitor.WorkArea.Height; // like 1080 (px)

                bool isOutsideHorizontalWorkArea = horizontalWindowEdge > horizontalWorkAreaEdge;
                bool isOutsideVerticalWorkArea = verticalWindowEdge > verticalWorkAreaEdge;

                Point locationInsideWorkArea = new Point(
                    isOutsideHorizontalWorkArea ? horizontalWorkAreaEdge - this.Width : location.X,
                    isOutsideVerticalWorkArea ? verticalWorkAreaEdge - this.Height : location.Y
                );

                location = locationInsideWorkArea;
            }

            this.Location = location;

            return this;
        }

        /// <summary>
        /// Moves the window to the specified location
        /// on the screen using left and right position.
        /// </summary>
        /// <param name="left">The location from the left of the screen</param>
        /// <param name="top">The location from the top of the screen</param>
        /// <param name="allowOutsideWorkArea">Allow the window to move outside the work area of the monitor</param>
        /// <returns>The current IPhotinoWindow instance</returns>
        public IPhotinoWindow MoveTo(int left, int top, bool allowOutsideWorkArea = false)
        {
            if (this.LogVerbosity > 1)
                Console.WriteLine($"Executing: \"{this.Title ?? "PhotinoWindow"}\".Move(int left, int top)");
            
            return this.MoveTo(new Point(left, top), allowOutsideWorkArea);
        }

        /// <summary>
        /// Moves the window relative to its current location
        /// on the screen using a Point struct.
        /// </summary>
        /// <param name="offset">The Point struct defining the location offset</param>
        /// <returns>The current IPhotinoWindow instance</returns>
        public IPhotinoWindow Offset(Point offset)
        {
            if (this.LogVerbosity > 1)
                Console.WriteLine($"Executing: \"{this.Title ?? "PhotinoWindow"}\".Offset(Point offset)");
            
            Point location = this.Location;

            int left = location.X + offset.X;
            int top = location.Y + offset.Y;

            return this.MoveTo(left, top);
        }

        /// <summary>
        /// Moves the window relative to its current location
        /// on the screen using left and top coordinates.
        /// </summary>
        /// <param name="left">The location offset from the left</param>
        /// <param name="top">The location offset from the top</param>
        /// <returns>The current IPhotinoWindow instance</returns>
        public IPhotinoWindow Offset(int left, int top)
        {
            if (this.LogVerbosity > 1)
                Console.WriteLine($"Executing: \"{this.Title ?? "PhotinoWindow"}\".Offset(int left, int top)");
            
            return this.Offset(new Point(left, top));
        }

        /// <summary>
        /// Centers the window on the main monitor work area.
        /// </summary>
        /// <returns>The current IPhotinoWindow instance</returns>
        public IPhotinoWindow Center()
        {
            if (this.LogVerbosity > 1)
                Console.WriteLine($"Executing: \"{this.Title ?? "PhotinoWindow"}\".Center()");

            Size workAreaSize = this.MainMonitor.WorkArea.Size;

            Point centeredPosition = new Point(
                ((workAreaSize.Width / 2) - (this.Width / 2)),
                ((workAreaSize.Height / 2) - (this.Height / 2))
            );

            return this.MoveTo(centeredPosition);
        }

        /// <summary>
        /// Loads a URI resource into the window view.
        /// </summary>
        /// <param name="uri">The URI to the resource</param>
        /// <returns>The current IPhotinoWindow instance</returns>
        public IPhotinoWindow Load(Uri uri)
        {
            if (this.LogVerbosity > 1)
                Console.WriteLine($"Executing: \"{this.Title ?? "PhotinoWindow"}\".Load(Uri uri)");

            // Navigation only works after the window was shown once.
            if (this.WasShown == false)
            {
                this.Show();
            }
            
            // ––––––––––––––––––––––
            // SECURITY RISK!
            // This needs validation!
            // ––––––––––––––––––––––
            //Photino_NavigateToUrl(_nativeInstance, uri.ToString());

            return this;
        }

        /// <summary>
        /// Loads a path resource into the window view.
        /// </summary>
        /// <param name="path">The path to the resource</param>
        /// <returns>The current IPhotinoWindow instance</returns>
        public IPhotinoWindow Load(string path)
        {
            if (this.LogVerbosity > 1)
                Console.WriteLine($"Executing: \"{this.Title ?? "RemotePhotinoWindow"}\".Load(string path)");
            
            // ––––––––––––––––––––––
            // SECURITY RISK!
            // This needs validation!
            // ––––––––––––––––––––––
            // Open a web URL string path
            if (path.Contains("http://") || path.Contains("https://"))
            {
                return this.Load(new Uri(path));
            }

            // Open a file resource string path
            string absolutePath = Path.GetFullPath(path);

            // For bundled app it can be necessary to consider
            // the app context base directory. Check there too.
            if (File.Exists(absolutePath) == false)
            {
                absolutePath = $"{System.AppContext.BaseDirectory}/{path}";

                // If the file does not exist on this path,
                // send an error message to user.
                if (File.Exists(absolutePath) == false)
                {
                    Console.WriteLine($"File \"{path}\" could not be found.");
                    return this;
                }
            }

            return this.Load(new Uri(absolutePath, UriKind.Absolute));
        }

        /// <summary>
        /// Loads a raw string into the window view, like HTML.
        /// </summary>
        /// <param name="content">The raw string resource</param>
        /// <returns>The current IPhotinoWindow instance</returns>
        public IPhotinoWindow LoadRawString(string content)
        {
            if (this.LogVerbosity > 1)
                Console.WriteLine($"Executing: \"{this.Title ?? "PhotinoWindow"}\".LoadRawString(string content)");

            // Navigation only works after the window was shown once.
            if (this.WasShown == false)
            {
                this.Show();
            }

            //Photino_NavigateToString(_nativeInstance, content);

            return this;
        }

        /// <summary>
        /// Opens a native alert window with a title and message.
        /// </summary>
        /// <param name="title">The window title.</param>
        /// <param name="message">The window message body.</param>
        /// <returns>The current IPhotinoWindow instance.</returns>
        public IPhotinoWindow OpenAlertWindow(string title, string message)
        {
            if (this.LogVerbosity > 1)
                Console.WriteLine($"Executing: \"{this.Title ?? "PhotinoWindow"}\".OpenAlertWindow(string title, string message)");
            
            // Bug:
            // Closing the message shown with the OpenAlertWindow
            // method closes the sender window as well.
            //Invoke(() => Photino_ShowMessage(_nativeInstance, title, message, /* MB_OK */ 0));

            return this;
        }

        

        /// <summary>
        /// Register event handlers from options on window init,
        /// both publicly accessible and private handlers can be registered.
        /// </summary>
        /// <param name="options"></param>
        private void RegisterEventHandlersFromOptions(PhotinoWindowOptions options)
        {
            if (options.WindowCreatingHandler != null)
            {
                this.RegisterWindowCreatingHandler(options.WindowCreatingHandler);
            }

            if (options.WindowCreatedHandler != null)
            {
                this.RegisterWindowCreatedHandler(options.WindowCreatedHandler);
            }
            
            if (options.WindowClosingHandler != null)
            {
                this.RegisterWindowClosingHandler(options.WindowClosingHandler);
            }

            if (options.SizeChangedHandler != null)
            {
                this.RegisterSizeChangedHandler(options.SizeChangedHandler);
            }

            if (options.LocationChangedHandler != null)
            {
                this.RegisterLocationChangedHandler(options.LocationChangedHandler);
            }
            
            if (options.WebMessageReceivedHandler != null)
            {
                this.RegisterWebMessageReceivedHandler(options.WebMessageReceivedHandler);
            }
        }

        // Register public event handlers

        /// <summary>
        /// Register a handler that is fired on a window closing event.
        /// </summary>
        /// <param name="handler">A handler that accepts a IPhotinoWindow argument.</param>
        /// <returns>The current IPhotinoWindow instance.</returns>
        public IPhotinoWindow RegisterWindowClosingHandler(EventHandler handler)
        {
            if (this.LogVerbosity > 1)
                Console.WriteLine($"Executing: \"{this.Title ?? "PhotinoWindow"}\".RegisterWindowClosingHandler(EventHandler handler)");
            
            this.WindowClosing += handler;

            return this;
        }

        // Register private event handlers

        /// <summary>
        /// Register a handler that is fired on a window creating event.
        /// Can only be registered in IPhotinoWindowOptions.
        /// </summary>
        /// <param name="handler">A handler that accepts a IPhotinoWindow argument.</param>
        /// <returns>The current IPhotinoWindow instance.</returns>
        private IPhotinoWindow RegisterWindowCreatingHandler(EventHandler handler)
        {
            if (this.LogVerbosity > 1)
                Console.WriteLine($"Executing: \"{this.Title ?? "PhotinoWindow"}\".RegisterWindowCreatingHandler(EventHandler handler)");
            
            this.WindowCreating += handler;

            return this;
        }
        
        /// <summary>
        /// Register a handler that is fired on a window created event.
        /// Can only be registered in IPhotinoWindowOptions.
        /// </summary>
        /// <param name="handler">A handler that accepts a IPhotinoWindow argument.</param>
        /// <returns>The current IPhotinoWindow instance.</returns>
        private IPhotinoWindow RegisterWindowCreatedHandler(EventHandler handler)
        {
            if (this.LogVerbosity > 1)
                Console.WriteLine($"Executing: \"{this.Title ?? "PhotinoWindow"}\".RegisterWindowCreatedHandler(EventHandler handler)");
            
            this.WindowCreated += handler;

            return this;
        }

        // Register native event handlers

        /// <summary>
        /// Register a custom request path scheme that matches a url
        /// scheme like "app", "api" or "assets".  Some schemes can't 
        /// be used because they're already in use like "http" or "file".
        /// A url path like "api://some-resource" can be caught with a 
        /// scheme handler like this and dynamically processed on the backend.
        /// 
        /// Can only be registered in IPhotinoWindowOptions.
        /// </summary>
        /// <param name="scheme">Name of the scheme, like "app".</param>
        /// <param name="handler">Handler that processes a request path.</param>
        /// <returns>The current IPhotinoWindow instance.</returns>
        private IPhotinoWindow RegisterCustomSchemeHandler(string scheme, CustomSchemeDelegate handler)
        {
            // Because of WKWebView limitations, this can only be called during the constructor
            // before the first call to Show. To enforce this, it's private and is only called
            // in response to the constructor options.
            if (this.WasShown == true)
            {
                throw new InvalidOperationException("Can only register custom scheme handlers from within the PhotinoWindowOptions context.");
            }

            //WebResourceRequestDelegate callback = (string url, out int numBytes, out string contentType) =>
            //{
            //    var responseStream = handler(url, out contentType);
            //    if (responseStream == null)
            //    {
            //        // Webview should pass through request to normal handlers (e.g., network)
            //        // or handle as 404 otherwise
            //        numBytes = 0;
            //        return default;
            //    }

            //    // Read the stream into memory and serve the bytes
            //    // In the future, it would be possible to pass the stream through into C++
            //    using (responseStream)
            //    using (var ms = new MemoryStream())
            //    {
            //        responseStream.CopyTo(ms);

            //        numBytes = (int)ms.Position;
            //        var buffer = Marshal.AllocHGlobal(numBytes);
            //        Marshal.Copy(ms.GetBuffer(), 0, buffer, numBytes);
            //        _hGlobalToFree.Add(buffer);
            //        return buffer;
            //    }
            //};

            //_gcHandlesToFree.Add(GCHandle.Alloc(callback));
            //Invoke(() => Photino_AddCustomScheme(_nativeInstance, scheme, callback));

            return this;
        }

        /// <summary>
        /// Register a handler that is fired on a size changed event.
        /// </summary>
        /// <param name="handler">A handler that accepts a IPhotinoWindow and Size argument.</param>
        /// <returns>The current IPhotinoWindow instance.</returns>
        public IPhotinoWindow RegisterSizeChangedHandler(EventHandler<Size> handler)
        {
            if (this.LogVerbosity > 1)
                Console.WriteLine($"Executing: \"{this.Title ?? "PhotinoWindow"}\".RegisterSizeChangedHandler(EventHandler<Size> handler)");
            
            this.SizeChanged += handler;

            return this;
        }

        /// <summary>
        /// Register a handler that is fired on a location changed event.
        /// </summary>
        /// <param name="handler">A handler that accepts a IPhotinoWindow and Point argument.</param>
        /// <returns>The current IPhotinoWindow instance.</returns>
        public IPhotinoWindow RegisterLocationChangedHandler(EventHandler<Point> handler)
        {
            if (this.LogVerbosity > 1)
                Console.WriteLine($"Executing: \"{this.Title ?? "PhotinoWindow"}\".RegisterLocationChangedHandler(EventHandler<Point> handler)");
            
            this.LocationChanged += handler;

            return this;
        }

        /// <summary>
        /// Register a handler that is fired on a web message received event.
        /// </summary>
        /// <param name="handler">A handler that accepts a IPhotinoWindow argument.</param>
        /// <returns>The current IPhotinoWindow instance.</returns>
        public IPhotinoWindow RegisterWebMessageReceivedHandler(EventHandler<string> handler)
        {
            if (this.LogVerbosity > 1)
                Console.WriteLine($"Executing: \"{this.Title ?? "PhotinoWindow"}\".RegisterWebMessageReceivedHandler(EventHandler<string> handler)");
            
            this.WebMessageReceived += handler;

            return this;
        }

        // Invoke public event handlers
        private void OnWindowCreating()
        {
            if (this.LogVerbosity > 1)
                Console.WriteLine($"Executing: \"{this.Title ?? "PhotinoWindow"}\".OnWindowCreating()");

            this.WindowCreating?.Invoke(this, null);
        }
        
        private void OnWindowCreated()
        {
            if (this.LogVerbosity > 1)
                Console.WriteLine($"Executing: \"{this.Title ?? "PhotinoWindow"}\".OnWindowCreated()");

            this.WindowCreated?.Invoke(this, null);
        }

        private void OnWindowClosing()
        {
            if (this.LogVerbosity > 1)
                Console.WriteLine($"Executing: \"{this.Title ?? "PhotinoWindow"}\".OnWindowClosing()");

            this.WindowClosing?.Invoke(this, null);
        }

        // Invoke native event handlers
        // These event handlers are called from inside
        // the native window context and are not handled.
        // Don't forget to add new handlers to the
        // garbage collector along with existing ones.
        private void OnClosing()
        {

        }

        private void OnSizeChanged(int width, int height)
        {
            if (this.LogVerbosity > 1)
                Console.WriteLine($"Executing: \"{this.Title ?? "PhotinoWindow"}\".OnSizeChanged(int width, int height)");

            this.SizeChanged?.Invoke(this, new Size(width, height));
        }

        private void OnLocationChanged(int left, int top)
        {
            if (this.LogVerbosity > 1)
                Console.WriteLine($"Executing: \"{this.Title ?? "PhotinoWindow"}\".OnLocationChanged(int left, int top)");

            this.LocationChanged?.Invoke(this, new Point(left, top));
        }

        private void OnWebMessageReceived(string message)
        {
            if (this.LogVerbosity > 1)
                Console.WriteLine($"Executing: \"{this.Title ?? "RemotePhotinoWindow"}\".OnMWebessageReceived(string message)");

            this.WebMessageReceived?.Invoke(this, message);
        }

        #endregion

    }
}
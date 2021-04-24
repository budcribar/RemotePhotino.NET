using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Channels;
using System.Threading.Tasks;

namespace PeakSWC.RemotePhotinoNET
{
    public class Startup
    {
        private readonly ConcurrentDictionary<string, ServiceState> rootDictionary = new();
        private readonly ConcurrentDictionary<string, IPC> ipcDictionary = new();
        private readonly Channel<ClientResponse> serviceStateChannel = Channel.CreateUnbounded<ClientResponse>();

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton(ipcDictionary);
            services.AddSingleton(rootDictionary);
            services.AddSingleton(serviceStateChannel);
            services.AddResponseCompression(options => { 
                options.MimeTypes = new[] { "application/octet-stream", "application/wasm" }; });
            services.AddGrpc();

            services.AddCors(o =>
            {
                o.AddPolicy("CorsPolicy", builder =>
                {
                    builder.AllowAnyOrigin();
                    builder.AllowAnyHeader();
                    builder.AllowAnyMethod();

                    // TODO tighten this up
                    //builder.WithOrigins("localhost:443", "localhost", "YourCustomDomain");
                    // builder.WithMethods("POST, OPTIONS");
                    //builder.AllowAnyHeader();
                    builder.WithExposedHeaders("Grpc-Status", "Grpc-Message", "Grpc-Encoding", "Grpc-Accept-Encoding");
                });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("CorsPolicy");
            app.UseResponseCompression();
            app.UseRouting();

            app.UseGrpcWeb();

            var provider = new FileExtensionContentTypeProvider();
            // Add new mappings
            provider.Mappings[".blat"] = "application/octet-stream";
            provider.Mappings[".dll"] = "application/octet-stream";
            provider.Mappings[".dat"] = "application/octet-stream";
            provider.Mappings[".json"] = "application/json";
            provider.Mappings[".wasm"] = "application/wasm";
            provider.Mappings[".woff"] = "application/font-woff";
            provider.Mappings[".woff2"] = "application/font-woff";

            app.UseRewriter(new Microsoft.AspNetCore.Rewrite.RewriteOptions().AddRewrite("^wwwroot$", "wwwroot/index.html", false));
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new CompositeFileProvider(new FileResolver(app.ApplicationServices?.GetService<ConcurrentDictionary<string, ServiceState>>() ?? new()), new ManifestEmbeddedFileProvider(typeof(RemotePhotinoService).Assembly)),
                ContentTypeProvider = provider
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapGrpcService<RemotePhotinoService>();
                endpoints.MapGrpcService<ClientIPCService>().EnableGrpcWeb();//.RequireCors("CorPolicy")
                endpoints.MapGrpcService<BrowserIPCService>().EnableGrpcWeb();

                endpoints.MapGet("/app", async context =>
                {
                    if (context.Request.Query.TryGetValue("guid", out StringValues value))
                    {
                        string guid = value.ToString();

                        if (rootDictionary.ContainsKey(guid))
                        {
                            var home = rootDictionary[guid].HtmlHostPath;

                            context.Response.Redirect(guid + "/" + home);
                        }
                        else await context.Response.WriteAsync("Invalid Guid");
                    }
                    else await context.Response.WriteAsync("Invalid Guid");
                });

                endpoints.MapGet("/wait/{id:guid}", async context =>
                {
                    var id = context.Request.RouteValues["id"];
                    var sid = id?.ToString() ?? "";

                    for (int i = 0; i < 30; i++)
                    {
                        if (rootDictionary.ContainsKey(sid))
                            break;
                        await Task.Delay(1000);
                    }
                    if (rootDictionary.ContainsKey(sid))
                        await context.Response.WriteAsync($"Wait completed");
                    else
                        await context.Response.WriteAsync($"Unable to restart -> Timed out");

                });

                endpoints.MapGet("/{id:guid}", async context =>
                {
                    // restart url
                    var id = context.Request.RouteValues["id"];
                    if (id == null) return;
                    var sid = id.ToString();
                    if (sid == null) return;
                    ipcDictionary[sid].ReceiveMessage("booted:");

                    context.Response.Redirect($"/restart?guid={sid}");
                    await Task.CompletedTask;
                });


                endpoints.MapGet("/", async context =>
                {
                    context.Response.Redirect("wwwroot");
                    await Task.CompletedTask;
                });

            });
        }
    }
}

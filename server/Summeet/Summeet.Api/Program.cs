using Summeet.Api.Services;
using Summeet.Api.Middlewares;
using Summeet.Api.Controllers.Assets.Services;

var builder = WebApplication.CreateBuilder(args);

var services = builder.Services;
services.AddKeyedSingleton<IWebsocketServices, OfficeWebsocketServices>("/office");
services.AddKeyedSingleton<IWebsocketServices, WebRTCWebsocketServices>("/rtc");
services.AddScoped<IAssetDownloaderService, LocalAssetDownloaderService>();
services.AddControllers();

var app = builder.Build();
app.UseWebSockets();

app.MapControllers();
app.UseMiddleware<WebSocketMiddleware>();
Console.WriteLine("Your code is running");
app.Run();

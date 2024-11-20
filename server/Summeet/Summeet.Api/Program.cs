using Summeet.Api.Common.Services;
using Summeet.Api.Common.Middlewares;
using Meeting = Summeet.Api.Features.Meeting;
using RealTimeOffice = Summeet.Api.Features.RealTimeOffice;
using Summeet.Api.Features.Assets.Services;

var builder = WebApplication.CreateBuilder(args);

var services = builder.Services;
services.AddSocket<RealTimeOffice.WebSocketServices>("/office");
services.AddSocket<Meeting.WebSocketServices>("/rtc");

services.AddScoped<IAssetDownloaderService, LocalAssetDownloaderService>();

services.AddControllers();

var app = builder.Build();
app.UseWebSockets();

app.MapControllers();
app.UseMiddleware<WebSocketMiddleware>();
app.Run();

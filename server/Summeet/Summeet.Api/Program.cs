using Summeet.Api.Services;
using System.Text;
using System.Net.WebSockets;
using Microsoft.AspNetCore.Mvc;
using Summeet.Api.Middlewares;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
services.AddKeyedSingleton<IWebsocketServices, OfficeWebsocketServices>("/office");
services.AddKeyedSingleton<IWebsocketServices, WebRTCWebsocketServices>("/rtc");
var app = builder.Build();
app.UseWebSockets();

app.MapGet("/teste/{id}", ([FromRoute] int id) =>
{
    return id;
});

app.UseMiddleware<WebSocketMiddleware>();
Console.WriteLine("Your code is running");
app.Run();

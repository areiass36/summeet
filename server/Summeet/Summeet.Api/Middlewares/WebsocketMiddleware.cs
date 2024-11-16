using Summeet.Api.Services;
using System.Net.WebSockets;
using Summeet.Api.Utils;

namespace Summeet.Api.Middlewares;

public class WebSocketMiddleware
{
    private readonly RequestDelegate _next;
    public WebSocketMiddleware(RequestDelegate next) => _next = next;

    public async Task InvokeAsync(HttpContext context)
    {
        if (!context.WebSockets.IsWebSocketRequest)
        {
            await _next(context);
            return;
        }

        var route = context.Request.Path.ToString();
        var service = context.RequestServices.GetKeyedService<IWebsocketServices>(route);

        if (service is null)
            throw new NullReferenceException("WebSocket Service was not found");

        var socketId = Guid.NewGuid();

        Console.WriteLine($"Connection opened! {route} {socketId}");

        var query = context.Request.Query;
        using var socket = await context.WebSockets.AcceptWebSocketAsync();
        service.OnConnected(socketId, socket, query);

        string? message = null;
        while (socket.State == WebSocketState.Open)
        {
            if (message is not null)
                await service.OnMessageReceived(socketId, message);
            message = await socket.ReadMessageAsync();
        }

        service.OnDisconnected(socketId);

    }


}

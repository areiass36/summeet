
using System.Net.WebSockets;

namespace Summeet.Api.Common.Services;

public interface IWebSocketServices
{
    void OnConnected(Guid id, WebSocket socket, IQueryCollection query);
    void OnDisconnected(Guid id);
    Task OnMessageReceived(Guid sender, string message);
    Task SendMessage(Guid recipient, string message);
}

public static class WebSocketServicesExtentensions
{
    public static IServiceCollection AddSocket<T>(this IServiceCollection services, string route) where T : class, IWebSocketServices
    {
        services.AddKeyedSingleton<IWebSocketServices, T>(route);
        return services;
    }
}

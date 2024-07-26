
using System.Net.WebSockets;

namespace Summeet.Api.Services;

public interface IWebsocketServices
{
    void OnConnected(Guid id, WebSocket socket, IQueryCollection query);
    void OnDisconnected(Guid id);
    Task OnMessageReceived(Guid sender, string message);
    Task SendMessage(Guid recipient, string message);
}
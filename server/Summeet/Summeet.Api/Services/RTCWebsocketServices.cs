
using System.Collections.Concurrent;
using System.Net.WebSockets;
using System.Text;
using Newtonsoft.Json;
using Summeet.Api.Contracts;
using Summeet.Api.Utils;

namespace Summeet.Api.Services;

public class WebRTCWebsocketServices : IWebsocketServices
{
    private readonly ConcurrentDictionary<Guid, WebSocket> _sockets = new();
    private readonly ConcurrentDictionary<int, Guid> _userSocket = new();

    public void OnConnected(Guid id, WebSocket socket, IQueryCollection query)
    {
        var user = query["user"].Select(v => int.TryParse(v, out var id) ? id : 0).FirstOrDefault();
        if (user is 0)
            throw new ArgumentException("User cannot be 0");
        _sockets[id] = socket;
        _userSocket[user] = id;
    }

    public void OnDisconnected(Guid id)
    {
        _sockets.Remove(id, out var _);
    }

    public Task OnMessageReceived(Guid sender, string message)
    {
        var incomingMessage = JsonConvert.DeserializeObject<Message<RTCContent>>(message) ?? throw new ArgumentNullException("RTC message is null");
        var exists = _userSocket.TryGetValue(incomingMessage.Content.Destination, out var connectionId);
        if (!exists)
            throw new KeyNotFoundException("Destination not found");
        var socket = _sockets[connectionId];
        if (socket.State is WebSocketState.Open)
            return socket.SendMessage(message);
        return Task.CompletedTask;
    }

    public Task SendMessage(Guid recipient, string message)
    {
        throw new NotImplementedException();
    }
}
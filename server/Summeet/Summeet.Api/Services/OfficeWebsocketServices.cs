using System.Collections.Concurrent;
using System.Net.WebSockets;
using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Summeet.Api.Contracts;

namespace Summeet.Api.Services;

public class OfficeWebsocketServices : IWebsocketServices
{
    private record SocketData(int User, WebSocket Socket);
    private readonly ConcurrentDictionary<int, ConcurrentDictionary<Guid, SocketData>> _rooms = new();
    private readonly ConcurrentDictionary<Guid, int> _userRoom = new();

    public void OnConnected(Guid id, WebSocket socket, IQueryCollection query)
    {
        var roomId = query["roomId"].Select(v => int.TryParse(v, out var id) ? id : 0).FirstOrDefault();
        if (roomId is 0)
            throw new ArgumentException("Room Id cannot be 0");
        var userId = query["user"].Select(v => int.TryParse(v, out var id) ? id : 0).FirstOrDefault();
        if (userId is 0)
            throw new ArgumentException("User Id cannot be 0");

        var room = _rooms.GetValueOrDefault(roomId) ?? new();
        room[id] = new(userId, socket);
        _rooms[roomId] = room;
        _userRoom[id] = roomId;
    }

    public async void OnDisconnected(Guid id)
    {
        var roomId = _userRoom[id];
        var room = _rooms[roomId];
        var socketData = room[id];
        room.Remove(id, out var _);
        _userRoom.Remove(id, out var _);
        var message = new Message<PlayerDisconnectedContent>(MessageType.PlayerDisconnected, new(socketData.User));
        var json = JsonConvert.SerializeObject(message, new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() });
        foreach (var socket in room.Values)
        {
            if (socket.Socket.State is not WebSocketState.Open)
                continue;

            await socket.Socket.SendAsync(Encoding.ASCII.GetBytes(json), WebSocketMessageType.Text, endOfMessage: true, CancellationToken.None);
        }
    }

    public async Task OnMessageReceived(Guid id, string message)
    {
        await BroadcastMessage(message, id);
    }

    public async Task BroadcastMessage(string message, Guid except)
    {
        var socketsInRoom = _rooms[_userRoom[except]]!;
        var excludeUser = socketsInRoom[except].User;
        foreach (var socketData in socketsInRoom)
        {
            var socket = socketData.Value.Socket;
            if (socketData.Value.User == excludeUser || socket.State is not WebSocketState.Open || socketData.Value.User == 0)
                continue;

            await socket.SendAsync(Encoding.ASCII.GetBytes(message), WebSocketMessageType.Text, endOfMessage: true, CancellationToken.None);
        }
    }

    public async Task SendMessage(Guid recipient, string message)
    {
        await Task.Run(() => throw new NotImplementedException());
    }
}

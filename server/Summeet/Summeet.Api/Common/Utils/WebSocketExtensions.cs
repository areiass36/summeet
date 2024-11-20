using System.Net.WebSockets;
using System.Text;

namespace Summeet.Api.Common.Utils;

public static class WebsocketExtensiosn
{
    public static async Task<string?> ReadMessageAsync(this WebSocket socket)
    {
        var buffer = new ArraySegment<byte>(new byte[1024]);
        using var ms = new MemoryStream();
        var received = null as WebSocketReceiveResult;
        do
        {
            received = await socket.ReceiveAsync(buffer, CancellationToken.None);
            ms.Write(buffer!.Array!, buffer.Offset, received.Count);
        } while (!received.EndOfMessage);

        if (received.MessageType is not WebSocketMessageType.Text)
            return null;

        ms.Position = 0;
        using var reader = new StreamReader(ms);
        return await reader.ReadToEndAsync();
    }

    public static async Task SendMessage(this WebSocket socket, string message)
    {
        await socket.SendAsync(Encoding.ASCII.GetBytes(message), WebSocketMessageType.Text, endOfMessage: true, CancellationToken.None);
    }
}

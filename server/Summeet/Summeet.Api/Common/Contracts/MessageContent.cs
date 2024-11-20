namespace Summeet.Api.Common.Contracts;

public record PlayerDisconnectedContent(int User);

public class RTCContent
{
    public int Origin { get; set; }
    public int Destination { get; set; }
    public object? Packet { get; set; }
}

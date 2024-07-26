namespace Summeet.Api.Contracts;

public record Message(string Type);
public record Message<T>(string Type, T Content) : Message(Type);
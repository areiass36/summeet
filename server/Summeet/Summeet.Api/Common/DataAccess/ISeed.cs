namespace Summeet.Api.Common.DataAccess;

public interface ISeed<T>
{
    public IEnumerable<T> Seed { get; }
}

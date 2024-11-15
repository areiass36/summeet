namespace Summeet.Api.Services;

public interface IAssetDownloaderService
{
    Task<Stream> Download(string name);
}

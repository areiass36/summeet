namespace Summeet.Api.Features.Assets.Services;

public interface IAssetDownloaderService
{
    Task<Stream> Download(string name);
}

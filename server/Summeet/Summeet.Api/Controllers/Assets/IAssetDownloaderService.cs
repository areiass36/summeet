namespace Summeet.Api.Controllers.Assets.Services;

public interface IAssetDownloaderService
{
    Task<Stream> Download(string name);
}

namespace Summeet.Api.Features.Assets.Services;

public class LocalAssetDownloaderService : IAssetDownloaderService
{
    private readonly IWebHostEnvironment _hostEnvironment;

    public LocalAssetDownloaderService(IWebHostEnvironment hostEnvironment)
    {
        _hostEnvironment = hostEnvironment;
    }

    public async Task<Stream> Download(string name)
    {
        var file = Path.Combine(_hostEnvironment.WebRootPath, "images", name) ?? string.Empty;
        var fileStream = File.OpenRead(file);
        return await Task.Run(() => fileStream);
    }
}

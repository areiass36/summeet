using Microsoft.AspNetCore.Mvc;
using Summeet.Api.Features.Assets.Services;
using GetAssets = Summeet.Api.Features.Assets.Contracts.GetAssets;

namespace Summeet.Api.Features.Assets;

[ApiController]
[Route("api/assets")]
public class Controller : ControllerBase
{
    public async Task<GetAssets.Response> GetAssets()
    {
        return await Task.Run<GetAssets.Response>(() => new());
    }

    [HttpGet("{file}")]
    public async Task<Stream> Download([FromRoute] string file, [FromServices] IAssetDownloaderService downloader) => await downloader.Download(file);
}

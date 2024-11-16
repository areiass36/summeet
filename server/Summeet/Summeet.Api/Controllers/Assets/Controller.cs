using Microsoft.AspNetCore.Mvc;
using Summeet.Api.Controllers.Assets.Services;
using GetAssets = Summeet.Api.Controllers.Assets.Contracts.GetAssets;

namespace Summeet.Api.Controllers.Assets;

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

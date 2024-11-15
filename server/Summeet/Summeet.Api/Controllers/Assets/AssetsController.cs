using Microsoft.AspNetCore.Mvc;
using Summeet.Api.Services;

namespace Summeet.Api.Controllers.Assets;

[ApiController]
[Route("api/[controller]")]
public class AssetsController : ControllerBase
{
    private AssetsController() { }

    [HttpGet("{file}")]
    public async Task<Stream> Download([FromRoute] string file, [FromServices] IAssetDownloaderService downloader) => await downloader.Download(file);
}

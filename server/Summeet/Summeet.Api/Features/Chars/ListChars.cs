using System.Linq;

namespace Summeet.Api.Features.Chars;

public static class ListChars
{
    private const string BaseFolder = "wwwroot/images/chars/";
    public static IResult Handler()
    {
        var files = Directory.GetFiles(BaseFolder);
        var maps = files.Select(f => f.Replace(BaseFolder, string.Empty).Replace(".png", string.Empty));
        return Results.Ok(maps.Select(m => Convert.ToInt32(m)).Order());
    }
}

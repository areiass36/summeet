namespace Summeet.Api.Features.Chars;

public static class Routes
{
    public static void Chars(this RouteGroupBuilder routes)
    {
        routes.MapGet("/", ListChars.Handler);
    }
}

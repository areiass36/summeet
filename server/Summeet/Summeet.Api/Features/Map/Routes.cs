namespace Summeet.Api.Features.Map;

public static class Routes
{
    public static void Map(this RouteGroupBuilder routes)
    {
        routes.MapGet("/", ListMaps.Handler);
        routes.MapGet("/{id}", Collision.Handler);
    }
}

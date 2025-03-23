
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Summeet.Api.Common.DataAccess;
using Summeet.Api.Common.DataAccess.Entities;
using Queries = Summeet.Api.Common.DataAccess.Queries;

namespace Summeet.Api.Features.Map;

public static class Collision
{
    public static IResult Handler([FromRoute] int id, [FromServices] Database db)
    {
        var collision = db.QuerySingleOrDefault<MapCollision>(Queries.MapCollision.GetById, new { Id = id });
        if (collision is null)
            return Results.NotFound(id);
        return Results.Ok(collision);
    }
}

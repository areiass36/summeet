using Entity = Summeet.Api.Common.DataAccess.Entities.MapCollision;

namespace Summeet.Api.Common.DataAccess.Queries;

public static class MapCollision
{
    public const string GetById = $"select {nameof(Entity.Key)}, {nameof(Entity.Collision)} from {nameof(Entities.MapCollision)} where {nameof(Entity.Key)} = @Id";
    public const string GetAll = $"select {nameof(Entity.Key)}, {nameof(Entity.Collision)} from {nameof(Entities.MapCollision)}";
}

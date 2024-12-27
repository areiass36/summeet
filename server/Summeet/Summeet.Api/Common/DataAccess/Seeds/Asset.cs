using Entity = Summeet.Api.Common.DataAccess.Entities;
using Type = Summeet.Api.Common.DataAccess.Entities.Asset.AssetType;

namespace Summeet.Api.Common.DataAccess.Seeds;

file static class Keys
{
    public const string Body = "body";
    public const string Outfit1 = "outfit1";
    public const string Hairstyle1 = "hairstyle1";
    public const string Accessory1 = "accessory1";
}

public class Asset : ISeed<Entity.Asset>
{

    public IEnumerable<Entity.Asset> Seed => [
        new() {
            Key = Keys.Body,
            Type = Type.Body
        },
        new(){
            Key = Keys.Outfit1,
            Type = Type.Outfit,
        },
        new(){
            Key = Keys.Hairstyle1,
            Type = Type.Hairstyle,
        },
        new(){
            Key = Keys.Accessory1,
            Type = Type.Accessory,
        },
    ];
}

public class AssetVariant : ISeed<Entity.AssetVariant>
{
    public IEnumerable<Entity.AssetVariant> Seed => [
        new() {
            Key = Keys.Body,
            Color = "#ff0000"
        },
        new() {
            Key = Keys.Body,
            Color = "#00ff00"
        },
        new() {
            Key = Keys.Body,
            Color = "#00ffff"
        },
        new() {
            Key = Keys.Outfit1,
            Color = "#00ffff"
        },
        new() {
            Key = Keys.Outfit1,
            Color = "#00ffff"
        },
        new() {
            Key = Keys.Hairstyle1,
            Color = "#00ffff"
        },
        new() {
            Key = Keys.Accessory1,
            Color = "#00ffff"
        },
        new() {
            Key = Keys.Accessory1,
            Color = "#ff0000"
        },

    ];
}

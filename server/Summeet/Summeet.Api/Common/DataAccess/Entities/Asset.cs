namespace Summeet.Api.Common.DataAccess.Entities;

public class Asset
{
    public string Key { get; set; } = string.Empty;
    public AssetType Type { get; set; }
    public ICollection<AssetVariant> Variants { get; set; } = [];

    public enum AssetType
    {
        Body = 1,
        Hairstyle = 2,
        Outfit = 3,
        Accessory = 4
    }
}

public class AssetVariant
{
    public string Key { get; set; } = string.Empty;
    public string Color { get; set; } = string.Empty;
    public Asset Asset { get; set; } = new();
}

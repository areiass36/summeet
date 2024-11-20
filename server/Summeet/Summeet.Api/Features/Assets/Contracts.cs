namespace Summeet.Api.Features.Assets.Contracts.GetAssets
{
    public class Response
    {
        public Asset Body { get; set; } = new();
        public IEnumerable<Asset> HairStyle { get; set; } = Enumerable.Empty<Asset>();
        public IEnumerable<Asset> Outfits { get; set; } = Enumerable.Empty<Asset>();
        public IEnumerable<Asset> Accessories { get; set; } = Enumerable.Empty<Asset>();

        public class Asset
        {
            public string Key { get; set; } = string.Empty;
            public IEnumerable<Variant> Variants = Enumerable.Empty<Variant>();
        }

        public class Variant
        {
            public string Color { get; set; } = string.Empty;
            public string FileUrl { get; set; } = string.Empty;
        }
    }
}

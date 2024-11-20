using Entity = Summeet.Api.Common.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Summeet.Api.Common.DataAccess.Configurations;

public class Asset : IEntityTypeConfiguration<Entity.Asset>
{
    public void Configure(EntityTypeBuilder<Entity.Asset> builder)
    {
        builder.ToTable("Assets");

        builder.HasKey(e => e.Key);
        builder.Property(e => e.Type).IsRequired();

        builder.HasMany(e => e.Variants).WithOne(e => e.Asset).HasForeignKey(e => e.Key).IsRequired();
    }
}

public class AssetVariant : IEntityTypeConfiguration<Entity.AssetVariant>
{
    public void Configure(EntityTypeBuilder<Entity.AssetVariant> builder)
    {
        builder.ToTable("AssetVariant");

        builder.HasKey(e => new { e.Key, e.Color });
        builder.Property(e => e.Key).IsRequired();
        builder.Property(e => e.Color).IsRequired();

        builder.HasOne(e => e.Asset).WithMany(e => e.Variants).HasPrincipalKey(e => e.Key).IsRequired();
    }
}

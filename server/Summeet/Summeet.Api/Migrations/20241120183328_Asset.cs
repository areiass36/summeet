using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Summeet.Api.Migrations
{
    /// <inheritdoc />
    public partial class Asset : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Assets",
                columns: table => new
                {
                    Key = table.Column<string>(type: "TEXT", nullable: false),
                    Type = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Assets", x => x.Key);
                });

            migrationBuilder.CreateTable(
                name: "AssetVariant",
                columns: table => new
                {
                    Key = table.Column<string>(type: "TEXT", nullable: false),
                    Color = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AssetVariant", x => new { x.Key, x.Color });
                    table.ForeignKey(
                        name: "FK_AssetVariant_Assets_Key",
                        column: x => x.Key,
                        principalTable: "Assets",
                        principalColumn: "Key",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AssetVariant");

            migrationBuilder.DropTable(
                name: "Assets");
        }
    }
}

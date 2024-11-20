using Microsoft.EntityFrameworkCore;

namespace Summeet.Api.Common.DataAccess;

public class Database : DbContext
{
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=data.sql");
    }
}

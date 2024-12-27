using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Summeet.Api.Common.DataAccess;

public class Database : DbContext
{
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=data.sql");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(Database).Assembly);

        var seeds = typeof(Database).Assembly.GetTypes().Where(t => t.IsAssignableFrom(typeof(ISeed<>)) && !t.IsInterface && !t.IsAbstract);
        Console.WriteLine(seeds.Count());
        foreach (var seed in seeds)
        {
            Console.WriteLine("Applying Seed");
            var entityType = seed.GenericTypeArguments.First();
            var instance = Activator.CreateInstance(seed) as ISeed<object>;
            modelBuilder.Entity(entityType).HasData(instance!.Seed);
        }
    }
}


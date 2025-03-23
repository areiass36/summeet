using Microsoft.Data.Sqlite;
using Dapper;
using Microsoft.Extensions.Options;

namespace Summeet.Api.Common.DataAccess;

public class DatabaseOptions()
{
    public string Database { get; set; } = string.Empty;
    public string Script { get; set; } = string.Empty;
    public bool ShouldMigrate { get; set; }
}

public class Database : SqliteConnection
{
    private readonly DatabaseOptions _options;

    public Database(DatabaseOptions options) : base($"Data source={options.Database}")
    {
        ArgumentException.ThrowIfNullOrEmpty(options.Database);
        if (!File.Exists(options.Database))
            File.Create(options.Database);
        _options = options;
    }

    public void EnsureCreated()
    {
        if (State is not System.Data.ConnectionState.Open)
            Open();
        if (_options.ShouldMigrate)
        {
            var sql = File.ReadAllText(_options.Script);
            this.Execute(sql);
        }
    }
}

public static class DatabaseExtensions
{
    public static IServiceCollection AddDatabase(this IServiceCollection services)
    {
        services.AddScoped<Database>(srv =>
        {
            var options = srv.GetService<IOptions<DatabaseOptions>>()!.Value;
            var db = new Database(options);
            db.Open();
            db.EnsureCreated();
            return db;
        });
        return services;
    }
}

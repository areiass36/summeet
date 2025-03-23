using Summeet.Api.Common.Services;
using Summeet.Api.Middlewares;
using Meeting = Summeet.Api.Features.Meeting;
using RealTimeOffice = Summeet.Api.Features.RealTimeOffice;
using Summeet.Api.Common.DataAccess;
using Summeet.Api.Features.Map;
using Summeet.Api.Features.Chars;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
var config = builder.Configuration;

services.Configure<DatabaseOptions>(config.GetSection(nameof(Database)));

services.AddSocket<RealTimeOffice.WebSocketServices>("/office");
services.AddSocket<Meeting.WebSocketServices>("/rtc");
services.AddDatabase();

services.AddControllers();

var app = builder.Build();

var api = app.MapGroup("api");
api.MapGroup("map").Map();
api.MapGroup("chars").Chars();

app.UseStaticFiles();
app.UseWebSockets();

app.MapControllers();
app.UseMiddleware<WebSocketMiddleware>();
app.Run();

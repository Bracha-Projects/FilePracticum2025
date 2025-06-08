using Amazon.S3;
using DotEnv.Core;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Tagit.API;
using Tagit.API.Middlewares;
using Tagit.Core.Entities;
using Tagit.Core.Repositories;
using Tagit.Core.Services;
using Tagit.Data;
using Tagit.Data.Repositories;
using Tagit.Service.Services;
var builder = WebApplication.CreateBuilder(args);
Console.WriteLine($"Environment: {builder.Environment.EnvironmentName}");
if (builder.Environment.IsDevelopment())
{
    new EnvLoader().Load();
}
// Add services to the container.
builder.Services.AddJwtAuthentication(builder.Configuration); // Use the middleware

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var configuration = builder.Configuration;
builder.Services.AddSingleton<IConfiguration>(configuration);
//builder.Services.AddDefaultAWSOptions(builder.Configuration.GetAWSOptions()); // Loads AWS credentials and region from appsettings.json or environment variables
//builder.Services.AddAWSService<IAmazonS3>();
builder.Services.AddSingleton<IAmazonS3>(provider =>
{
    var awsOptions = configuration.GetSection("AWS");
    var accessKey = awsOptions["AccessKey"];
    var secretKey = awsOptions["SecretKey"];
    var region = awsOptions["Region"];

    var awsCredentials = new Amazon.Runtime.BasicAWSCredentials(accessKey, secretKey);
    return new AmazonS3Client(awsCredentials, Amazon.RegionEndpoint.GetBySystemName(region));
});

// Register logging (this is typically set up by default in ASP.NET Core)
builder.Services.AddLogging();
//Add dependencies to the repositories
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IFileRepository, FileRepository>();
builder.Services.AddScoped<ITagRepository, TagRepository>();
builder.Services.AddScoped<ILogRepository, LogRepository>();
builder.Services.AddScoped<IFolderRepository, FolderRepository>();
builder.Services.AddScoped<ISearchRepository, SearchRepository>();  
//Add dependencies to the Services
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IFileService, FileService>();
builder.Services.AddScoped<ILogService, LogService>();
builder.Services.AddScoped<ITagService, TagService>();
builder.Services.AddScoped<IJwtService, JwtService>();
builder.Services.AddScoped<IFolderService, FolderService>();
builder.Services.AddScoped<ISearchService, SearchService>();
//Add dependencies to DataContext
var host = Environment.GetEnvironmentVariable("MYSQL_HOST");
var databaseName = Environment.GetEnvironmentVariable("MYSQL_DATABASE");
var user = Environment.GetEnvironmentVariable("MYSQL_USER");
var password = Environment.GetEnvironmentVariable("MYSQL_PASSWORD");
var port = Environment.GetEnvironmentVariable("MYSQL_PORT") ?? "3306";

var connectionString = $"Server={host};Port={port};Database={databaseName};Uid={user};Pwd={password};";
Console.WriteLine(connectionString);
builder.Services.AddDbContext<TagitDBContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));


builder.Services.AddAutoMapper(typeof(MappingProfile));
builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});
var app = builder.Build();
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<TagitDBContext>();
    db.Database.Migrate();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors();

app.UseJwtAuthentication();
app.MapControllers();

app.Run();

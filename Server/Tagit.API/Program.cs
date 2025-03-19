using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
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

// Add services to the container.
builder.Services.AddJwtAuthentication(builder.Configuration); // Use the middleware

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//Add dependencies to the repositories
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IFileRepository, FileRepository>();
builder.Services.AddScoped<ITagRepository, TagRepository>();
builder.Services.AddScoped<ILogRepository, LogRepository>();
//Add dependencies to the Services
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IFileService, FileService>();
builder.Services.AddScoped<ILogService, LogService>();
builder.Services.AddScoped<ITagService, TagService>();
builder.Services.AddScoped<IJwtService, JwtService>();
//Add dependencies to DataContext
builder.Services.AddDbContext<TagitDBContext>(options =>
        options.UseSqlServer(@"Server=(localdb)\MSSQLLocalDB;Database=practicum"));

builder.Services.AddAutoMapper(typeof(MappingProfile));
builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseJwtAuthentication();
app.MapControllers();

app.Run();

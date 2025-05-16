using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tagit.Data
{
    public class TagitDbContextFactory : IDesignTimeDbContextFactory<TagitDBContext>
    {
        public TagitDBContext CreateDbContext(string[] args)
        {
            // טוען משתני סביבה
            DotNetEnv.Env.Load();

            var host = Environment.GetEnvironmentVariable("MYSQL_HOST");
            var databaseName = Environment.GetEnvironmentVariable("MYSQL_DATABASE");
            var user = Environment.GetEnvironmentVariable("MYSQL_USER");
            var password = Environment.GetEnvironmentVariable("MYSQL_PASSWORD");
            var port = Environment.GetEnvironmentVariable("MYSQL_PORT") ?? "3306";

            if (string.IsNullOrEmpty(host) || string.IsNullOrEmpty(databaseName) || string.IsNullOrEmpty(user) || string.IsNullOrEmpty(password))
            {
                throw new InvalidOperationException("One or more environment variables are missing.");
            }

            var connectionString = $"Server={host};Port={port};Database={databaseName};Uid={user};Pwd={password};";
            Console.WriteLine($"Using connection string: {connectionString}");

            var optionsBuilder = new DbContextOptionsBuilder<TagitDBContext>();
            optionsBuilder.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));

            return new TagitDBContext(optionsBuilder.Options);
        }
    }

}

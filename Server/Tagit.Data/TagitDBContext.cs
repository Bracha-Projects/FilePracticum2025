using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tagit.Core.Entities;

namespace Tagit.Data
{
    public class TagitDBContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Core.Entities.File> Files { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<Log> Logs { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Permission> Permissions { get; set; }
        public DbSet<Folder> Folders { get; set; }
        public TagitDBContext(DbContextOptions<TagitDBContext> options) : base(options)
        {
        }
    }
}

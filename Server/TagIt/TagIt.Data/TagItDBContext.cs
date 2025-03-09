using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TagIt.Core.Entities;

namespace TagIt.Data
{
    public class TagItDBContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Core.Entities.File> Files { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<Log> Logs { get; set; }
    }
}

using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tagit.Core.Entities;
using Tagit.Core.Repositories;

namespace Tagit.Data.Repositories
{
    public class LogRepository : ILogRepository
    {
        private readonly TagitDBContext _context; 

        public LogRepository(TagitDBContext context) 
        {
            _context = context;
        }

        public async Task<List<Log>> GetAllLogsAsync()
        {
            return await _context.Logs.ToListAsync();
        }

        public async Task<Log> GetLogByIdAsync(int id)
        {
            return await _context.Logs.FindAsync(id);
        }

    }
}

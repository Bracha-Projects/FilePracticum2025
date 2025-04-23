using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tagit.Core.Entities;

namespace Tagit.Core.Repositories
{
    public interface ILogRepository
    {
        Task<List<Log>> GetAllLogsAsync();
        Task<Log> GetLogByIdAsync(int id);
    }
}

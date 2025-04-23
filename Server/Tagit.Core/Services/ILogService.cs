using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tagit.Core.DTOs;
using Tagit.Core.Entities;

namespace Tagit.Core.Services
{
    public interface ILogService
    {
        Task<List<LogDTO>> GetAllLogsAsync();
        Task<LogDTO> GetLogByIdAsync(int id);
    }
}

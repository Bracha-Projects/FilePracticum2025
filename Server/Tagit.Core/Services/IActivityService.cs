using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tagit.Core.DTOs;

namespace Tagit.Core.Services
{
    public interface IActivityService
    {
        Task LogActivityAsync(int userId, string action, string? metadata = null);
        Task<List<ActivityDTO>> GetRecentByUserAsync(int userId, int limit);
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tagit.Core.Entities;

namespace Tagit.Core.Repositories
{
    public interface IActivityRepository
    {
        Task AddAsync(Activity activity);
        Task<List<Activity>> GetRecentByUserAsync(int userId, int limit);
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tagit.Core.Entities;
using Tagit.Core.Models;

namespace Tagit.Core.Repositories
{
    public interface IUserRepository
    {
        Task<User> GetByIdAsync(int id);
        Task<User> GetByEmailAsync(string email);
        Task<User> AddAsync(User user); // שונה מ-AddUserAsync
        Task<User> UpdateAsync(User user); // שונה מ-UpdateUserAsync
        Task<UserStatsModel> GetUserStatsAsync(int userId);

    }
}

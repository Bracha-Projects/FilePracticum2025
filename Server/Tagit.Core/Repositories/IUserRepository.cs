using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tagit.Core.Entities;
using Tagit.Core.Models;
using File = Tagit.Core.Entities.File;

namespace Tagit.Core.Repositories
{
    public interface IUserRepository
    {
        Task<User> GetByIdAsync(int id);
        Task<User> GetByEmailAsync(string email);
        Task<User> AddAsync(User user); 
        Task<User> UpdateAsync(User user); 
        Task<UserStatsModel> GetUserStatsAsync(int userId);
        Task<User> GetByProviderAsync(string provider, string providerId);

    }
}

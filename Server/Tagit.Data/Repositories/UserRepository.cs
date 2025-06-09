using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tagit.Core.Entities;
using Tagit.Core.Models;
using Tagit.Core.Repositories;

namespace Tagit.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly TagitDBContext _context;

        public UserRepository(TagitDBContext context)
        {
            _context = context;
        }

        public async Task<User> GetByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<User> GetByEmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<User> AddAsync(User user) 
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        async Task<User> IUserRepository.UpdateAsync(User user) 
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<UserStatsModel> GetUserStatsAsync(int userId)
        {
            var totalFiles = await _context.Files.CountAsync(f => f.OwnerId == userId);
            var totalSize = await _context.Files
                .Where(f => f.OwnerId == userId)
                .SumAsync(f => (long?)f.Size) ?? 0;

            var totalTags = await _context.Tags
            .Where(tag => tag.Files.Any(f => f.OwnerId == userId))
            .CountAsync();

            var totalFolders = await _context.Folders.CountAsync(f => f.OwnerId == userId);

            return new UserStatsModel
            {
                TotalFiles = totalFiles,
                TotalSizeBytes = totalSize,
                TotalTags = totalTags,
                TotalFolders = totalFolders
            };
        }

        public async Task<User> GetByProviderAsync(string provider, string providerId)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Provider == provider && u.ProviderId == providerId);
        }
    }
}

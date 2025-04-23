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
    }
}

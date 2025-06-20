using Microsoft.AspNetCore.Identity;
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
    public class AuthRepository:IAuthRepository
    {
        private readonly TagitDBContext _context;
        private readonly IPasswordHasher<User> _passwordHasher;
        public AuthRepository(TagitDBContext context, IPasswordHasher<User> passwordHasher)
        {
            _context = context;
            _passwordHasher = passwordHasher;
        }
        public async Task<PasswordResetToken> CreatePasswordResetTokenAsync(string email)
        {
            var token = new PasswordResetToken
            {
                Email = email,
                Token = Guid.NewGuid(),
                Expiration = DateTime.UtcNow.AddHours(1)
            };
            _context.PasswordResetTokens.Add(token);
            await _context.SaveChangesAsync();
            return token;
        }

        public async Task<PasswordResetToken?> GetValidTokenAsync(Guid token)
        {
            return await _context.PasswordResetTokens
                .FirstOrDefaultAsync(t => t.Token == token && t.Expiration > DateTime.UtcNow);
        }

        public async Task InvalidateTokenAsync(Guid token)
        {
            var item = await _context.PasswordResetTokens.FirstOrDefaultAsync(t => t.Token == token);
            if (item != null)
            {
                _context.PasswordResetTokens.Remove(item);
                await _context.SaveChangesAsync();
            }
        }

        public async Task UpdatePasswordAsync(string email, string newPassword)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user != null)
            {
                user.PasswordHash = _passwordHasher.HashPassword(user, newPassword);
                await _context.SaveChangesAsync();
            }
        }
    }
}

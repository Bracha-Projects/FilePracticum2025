using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tagit.Core.Entities;

namespace Tagit.Core.Repositories
{
    public interface IAuthRepository
    {
        Task<PasswordResetToken> CreatePasswordResetTokenAsync(string email);
        Task<PasswordResetToken?> GetValidTokenAsync(Guid token);
        Task InvalidateTokenAsync(Guid token);
        Task UpdatePasswordAsync(string email, string newPassword);

    }
}

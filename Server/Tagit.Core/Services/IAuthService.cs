using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tagit.Core.Services
{
    public interface IAuthService
    {
        Task<string> RequestPasswordResetAsync(string email);
        Task<bool> ResetPasswordAsync(Guid token, string newPassword);

    }
}

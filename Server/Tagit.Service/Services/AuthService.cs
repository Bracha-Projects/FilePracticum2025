using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tagit.Core.Repositories;
using Tagit.Core.Services;

namespace Tagit.Service.Services
{
    public class AuthService: IAuthService
    {
        private readonly IAuthRepository _repository;
        public AuthService(IAuthRepository authRepository)
        {
            _repository = authRepository;
        }
        public async Task<string> RequestPasswordResetAsync(string email)
        {
            var token = await _repository.CreatePasswordResetTokenAsync(email);
            return $"https://tag-it-client.onrender.com/reset-password?token={token.Token}";
        }

        public async Task<bool> ResetPasswordAsync(Guid token, string newPassword)
        {
            var tokenRecord = await _repository.GetValidTokenAsync(token);
            if (tokenRecord == null) return false;

            await _repository.UpdatePasswordAsync(tokenRecord.Email, newPassword);
            await _repository.InvalidateTokenAsync(token);
            return true;
        }

    }
}

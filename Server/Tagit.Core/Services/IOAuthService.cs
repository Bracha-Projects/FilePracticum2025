using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tagit.Core.DTOs;

namespace Tagit.Core.Services
{
    public interface IOAuthService
    {
          Task<UserDTO> ExternalLoginAsync(string provider, string token);
        Task<string> ExchangeGitHubCodeForAccessToken(string code);

    }
}

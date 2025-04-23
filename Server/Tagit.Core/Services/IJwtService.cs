using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tagit.Core.Entities;

namespace Tagit.Core.Services
{
    public interface IJwtService
    {
        string GenerateJwtToken(User user);
    }
}

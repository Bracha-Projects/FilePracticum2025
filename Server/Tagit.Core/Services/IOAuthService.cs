using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tagit.Core.DTOs;
using Tagit.Core.Models;

namespace Tagit.Core.Services
{
    public interface IOAuthService
    {
        Task<FirebaseUserInfo?> VerifyFirebaseTokenAsync(string idToken);
        Task<UserDTO?> FindOrCreateUserAsync(FirebaseUserInfo firebaseUser);
    }

}

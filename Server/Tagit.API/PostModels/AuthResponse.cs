using Tagit.Core.DTOs;

namespace Tagit.API.PostModels
{
    public class AuthResponse
    {
        public string Token { get; set; }
        public UserDTO User { get; set; }
    }
}

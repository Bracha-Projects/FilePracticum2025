using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tagit.Core.DTOs;
using Tagit.Core.Entities;
using File = Tagit.Core.Entities.File;

namespace Tagit.Core.Services
{
    public interface IUserService
    {
        Task<UserDTO> RegisterUserAsync(UserDTO user);
        Task<UserDTO> AuthenticateUserAsync(string email, string password);
        Task<UserDTO> UpdateUserSettingsAsync(UserDTO user);
        Task<UserDTO> GetUserByEmail(string email);
        Task<UserDTO> GetUserById(int id);
       // Task<List<File>> GetUserFilesAsync(int userId, string searchQuery, TagDTO filterTag);
    }
}

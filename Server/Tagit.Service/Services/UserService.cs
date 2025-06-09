using AutoMapper;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Tagit.Core.DTOs;
using Tagit.Core.Entities;
using Tagit.Core.Models;
using Tagit.Core.Repositories;
using Tagit.Core.Services;
using File = Tagit.Core.Entities.File;

namespace Tagit.Service.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IPasswordHasher<User> _passwordHasher; // הוספת שירות Hash
        private readonly IFileRepository _fileRepository;
        private readonly IFolderRepository _folderRepository;
        private readonly IMapper _mapper;
        public UserService(IUserRepository userRepository, IPasswordHasher<User> passwordHasher, IMapper mapper, IFileRepository fileRepository, IFolderRepository folderRepository)
        {
            _userRepository = userRepository;
            _passwordHasher = passwordHasher;
            _fileRepository = fileRepository;
            _mapper = mapper;
            _folderRepository = folderRepository;
        }

        public async Task<UserDTO> AuthenticateUserAsync(string email, string password)
        {
            var user = await _userRepository.GetByEmailAsync(email);
            if (user == null)
            {
                return null;
            }
            // שימוש ב-PasswordHasher לאימות סיסמה
            var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, password);
            if (result == PasswordVerificationResult.Success)
            {
                user.LastLoginAt = DateTime.Now;
                await _userRepository.UpdateAsync(user);
                return _mapper.Map<UserDTO>(user);
            }
            return null;
            return null;
        }

        public async Task<UserDTO> RegisterUserAsync(UserDTO user)
        {
            // בדיקה אם האימייל קיים
            if (await _userRepository.GetByEmailAsync(user.Email) != null)
            {
                throw new Exception("Email already in use");
            }
            var userToRegister = _mapper.Map<User>(user);
            userToRegister.PasswordHash = user.Password;
            userToRegister.PasswordHash = _passwordHasher.HashPassword(userToRegister, user.Password);
            userToRegister.CreatedAt = DateTime.UtcNow;
            await _userRepository.AddAsync(userToRegister);
            return _mapper.Map<UserDTO>(userToRegister);
        }

        public async Task<UserDTO> UpdateUserSettingsAsync(UserDTO user)
        {
            var existingUser = await _userRepository.GetByIdAsync(user.Id);
            if (existingUser == null)
            {
                return null;
            }

            // עדכון שדות משתמש
            if(user.FirstName != default)
                existingUser.FirstName = user.FirstName;
            if(user.LastName != default)
                existingUser.LastName = user.LastName;
            if(user.Role != default)
                existingUser.Role = user.Role;
            if (!string.IsNullOrEmpty(user.Password) && user.Password != default) 
            {
                existingUser.PasswordHash = user.Password;
                // Hash של הסיסמה החדשה אם סופקה
                existingUser.PasswordHash = _passwordHasher.HashPassword(existingUser, user.Password);
            }

            if (!string.IsNullOrEmpty(user.ProfileImageUrl))
                existingUser.ProfileImageUrl = user.ProfileImageUrl;

            existingUser.IsActive = user.IsActive;

            if (user.RootFolderId != default)
                existingUser.RootFolderId = user.RootFolderId;
            // עדכון שדות נוספים לפי הצורך

            await _userRepository.UpdateAsync(existingUser);
            return _mapper.Map<UserDTO>(existingUser);
        }

        public async Task<UserDTO> GetUserByEmail(string email)
        {
            return _mapper.Map<UserDTO>(await _userRepository.GetByEmailAsync(email));
        }
        public async Task<UserDTO> GetUserById(int id)
        {
            return _mapper.Map<UserDTO>(await _userRepository.GetByIdAsync(id));
        }

        public async Task<UserStatsModel> GetUserStatsAsync(int userId)
        {
            return await _userRepository.GetUserStatsAsync(userId);
        }
    }
}

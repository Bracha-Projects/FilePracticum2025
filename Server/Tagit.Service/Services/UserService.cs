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
        private readonly IMapper _mapper;
        public UserService(IUserRepository userRepository, IPasswordHasher<User> passwordHasher, IMapper mapper, IFileRepository fileRepository)
        {
            _userRepository = userRepository;
            _passwordHasher = passwordHasher;
            _fileRepository = fileRepository;
            _mapper = mapper;
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
            var userDTO = _mapper.Map<UserDTO>(user);
            if (result == PasswordVerificationResult.Success)
            {
                return userDTO;
            }
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
            // Hash של הסיסמה לפני שמירה
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
            existingUser.FirstName = user.FirstName;
            existingUser.LastName = user.LastName;
            existingUser.Role = user.Role;
            if (!string.IsNullOrEmpty(user.Password))
            {
                existingUser.PasswordHash = user.Password;
                // Hash של הסיסמה החדשה אם סופקה
                existingUser.PasswordHash = _passwordHasher.HashPassword(existingUser, user.Password);
            }
            // עדכון שדות נוספים לפי הצורך

            await _userRepository.UpdateAsync(existingUser);
            return _mapper.Map<UserDTO>(existingUser);
        }

        public async Task<UserDTO> GetUserByEmail(string email)
        {
            return _mapper.Map<UserDTO>(await _userRepository.GetByEmailAsync(email));
        }

        public async Task<List<File>> GetUserFilesAsync(int userId, string searchQuery, TagDTO filterTag)
        {
            // 1. Get all files for the user (or however you initially retrieve them)
            var files = await _fileRepository.GetUserFilesAsync(userId); // You'll need this method in IFileRepository

            if (files == null || files.Count == 0)
            {
                return new List<File>(); // Or return null, depending on your logic
            }

            // 2. Apply filtering
            if (!string.IsNullOrEmpty(filterTag.TagName))
            {
                files = files.Where(f => f.FileTags.Contains(_mapper.Map<Tag>(filterTag))).ToList(); // Assuming your File entity has a Tags property (e.g., a List<string>)
            }

            // 3. Apply searching
            if (!string.IsNullOrEmpty(searchQuery))
            {
                files = files.Where(f =>
                    f.FileName.Contains(searchQuery, StringComparison.OrdinalIgnoreCase)// Case-insensitive search on file name                                                                      // Add more search criteria as needed (e.g., search within tags)
                ).ToList();
            }

            return files;
        }

    }
}

using AutoMapper;
using FirebaseAdmin.Auth;
using System;
using System.Threading.Tasks;
using Tagit.Core.DTOs;
using Tagit.Core.Entities;
using Tagit.Core.Models;
using Tagit.Core.Repositories;
using Tagit.Core.Services;
using Tagit.Service.Services;

public class OAuthService : IOAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;
    private readonly IFolderService _folderService;
    private readonly IUserService _userService;

    public OAuthService(IUserRepository userRepository, IMapper mapper, IFolderService folderService, IUserService userService)
    {
        _userRepository = userRepository;
        _mapper = mapper;
        _folderService = folderService;
        _userService = userService;
    }

    public async Task<FirebaseUserInfo?> VerifyFirebaseTokenAsync(string idToken)
    {
        try
        {
            FirebaseToken decodedToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(idToken);
            var uid = decodedToken.Uid;
            var firebaseUser = await FirebaseAuth.DefaultInstance.GetUserAsync(uid);

            return new FirebaseUserInfo
            {
                Uid = firebaseUser.Uid,
                Email = firebaseUser.Email,
                Name = firebaseUser.DisplayName,
                Picture = firebaseUser.PhotoUrl
            };
        }
        catch
        {
            return null;
        }
    }

    public async Task<UserDTO?> FindOrCreateUserAsync(FirebaseUserInfo firebaseUser)
    {
        var existingUser = await _userRepository.GetByEmailAsync(firebaseUser.Email);
        if (existingUser != null)
        {
            existingUser.ProfileImageUrl = firebaseUser.Picture;
            existingUser.LastLoginAt = DateTime.UtcNow;
            existingUser.Provider = "Firebase";
            existingUser.ProviderId = firebaseUser.Uid;
            await _userRepository.UpdateAsync(existingUser);
            return _mapper.Map<UserDTO>(existingUser);
        }

        var newUser = new User
        {
            Email = firebaseUser.Email,
            FirstName = ExtractFirstName(firebaseUser.Name),
            LastName = ExtractLastName(firebaseUser.Name),
            Role = RoleType.User, 
            IsActive = true,
            ProfileImageUrl = firebaseUser.Picture,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
            LastLoginAt = DateTime.UtcNow,
            Provider = "Firebase",
            ProviderId = firebaseUser.Uid,
            RootFolderId = 0 
        };

        var createdUser = await _userRepository.AddAsync(newUser);
        var folder = new FolderDTO
        {
            Name = $"RootFolder_{newUser.Id}/",
            OwnerId = newUser.Id,
            ParentFolderId = null,
            CreatedAt = DateTime.UtcNow
        };
        var createdFolder = await _folderService.AddFolderAsync(folder);
        newUser.RootFolderId = createdFolder.Id;
        await _userService.UpdateUserSettingsAsync(_mapper.Map<UserDTO>(newUser));
        return _mapper.Map<UserDTO>(createdUser);
    }

    private string ExtractFirstName(string fullName)
    {
        if (string.IsNullOrEmpty(fullName))
            return "";

        var parts = fullName.Split(' ');
        return parts.Length > 0 ? parts[0] : fullName;
    }

    private string ExtractLastName(string fullName)
    {
        if (string.IsNullOrEmpty(fullName))
            return "";

        var parts = fullName.Split(' ');
        return parts.Length > 1 ? string.Join(" ", parts, 1, parts.Length - 1) : "";
    }
}

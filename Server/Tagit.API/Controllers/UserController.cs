using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Tagit.API.PostModels;
using Tagit.Core.DTOs;
using Tagit.Core.Entities;
using Tagit.Core.PostModels;
using Tagit.Core.Services;

namespace Tagit.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        private readonly IJwtService _jwtService;
        private readonly IFolderService _folderService;
        public UserController(IUserService userService, IMapper mapper, IJwtService jwtService, IFolderService folderService)
        {
            _userService = userService;
            _mapper = mapper;
            _jwtService = jwtService;
            _folderService = folderService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] UserPostModel user)
        {
            try
            {
                var userToRegister = _mapper.Map<UserDTO>(user);
                var registeredUser = await _userService.RegisterUserAsync(userToRegister);
                var folder = new FolderDTO
                {
                    Name = "Root Folder",
                    OwnerId = registeredUser.Id,
                    ParentFolderId = null, // Assuming this is the root folder
                    CreatedAt = DateTime.UtcNow
                };
                var createdFolder = await _folderService.AddFolderAsync(folder);
                registeredUser.RootFolderId = createdFolder.Id; 
                await _userService.UpdateUserSettingsAsync(registeredUser); 
                var token = _jwtService.GenerateJwtToken(_mapper.Map<User>(registeredUser));
                return Ok(new AuthResponse
                {
                    Token = token,
                    User = _mapper.Map<UserDTO>(registeredUser)
                });
            }
            catch (Exception ex)
            { 
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> AuthenticateUser([FromBody] UserLoginModel request)
        {
            var user = await _userService.AuthenticateUserAsync(request.Email, request.Password);
            if (user == null)
            {
                return Unauthorized();
            }
            var token = _jwtService.GenerateJwtToken(_mapper.Map<User>(user));
            return Ok(new AuthResponse
            {
                Token = token,
                User = user
            });
        }

        [HttpGet("{email}")]
        [Authorize]
        public async Task<IActionResult> GetUserByEmail(string email)
        {
            var user = await _userService.GetUserByEmail(email); 
            if (user == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<UserDTO>(user));
        }

        [HttpGet("protected")]
        [Authorize(Roles = "Admin")]
        public IActionResult ProtectedAdminResource()
        {
            return Ok("This is an admin protected resource");
        }

        [HttpPut("settings")]
        [Authorize] // דורש אימות
        public async Task<IActionResult> UpdateUserSettings([FromBody] UserPostModel userSettings)
        {
            // קבלת מזהה המשתמש המחובר
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null || !int.TryParse(userId, out int id))
            {
                return BadRequest("Invalid user ID.");
            }

            // מיפוי ה-DTO למודל הישות
            var userToUpdate = _mapper.Map<UserDTO>(userSettings);
            userToUpdate.Id = id; // שמירה על ה-ID של המשתמש המחובר

            try
            {
                var updatedUser = await _userService.UpdateUserSettingsAsync(userToUpdate);
                if (updatedUser == null)
                {
                    return NotFound("User not found.");
                }
                return Ok(_mapper.Map<UserDTO>(updatedUser)); // החזרת DTO מעודכן
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }
}

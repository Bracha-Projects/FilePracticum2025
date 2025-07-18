﻿using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Tagit.API.PostModels;
using Tagit.Core.DTOs;
using Tagit.Core.Entities;
using Tagit.Core.PostModels;
using Tagit.Core.Services;
using Tagit.Service.Services;

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
        private readonly IActivityService _activityService;
        public UserController(IUserService userService, IMapper mapper, IJwtService jwtService, IFolderService folderService, IActivityService activityService)
        {
            _userService = userService;
            _mapper = mapper;
            _jwtService = jwtService;
            _folderService = folderService;
            _activityService = activityService;
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
                    Name = $"RootFolder_{registeredUser.Id}/",
                    OwnerId = registeredUser.Id,
                    ParentFolderId = null, 
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
            var user = await _userService.GetUserByEmail(request.Email);
            if (user == null)
            {
                return NotFound("User not found");
            }
            var userDTO = await _userService.AuthenticateUserAsync(request.Email, request.Password);
            if (userDTO == null)
            {
                return Unauthorized();
            }
            var token = _jwtService.GenerateJwtToken(_mapper.Map<User>(userDTO));
            return Ok(new AuthResponse
            {
                Token = token,
                User = userDTO
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


        [HttpPut("settings")]
        [Authorize] 
        public async Task<IActionResult> UpdateUserSettings([FromBody] UserPostModel userSettings)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null || !int.TryParse(userId, out int id))
            {
                return BadRequest("Invalid user ID.");
            }

            var userToUpdate = _mapper.Map<UserDTO>(userSettings);
            userToUpdate.Id = id; 

            try
            {
                var updatedUser = await _userService.UpdateUserSettingsAsync(userToUpdate);
                if (updatedUser == null)
                {
                    return NotFound("User not found.");
                }
                return Ok(_mapper.Map<UserDTO>(updatedUser)); 
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpGet("{userId}/recent-activity")]
        public async Task<IActionResult> GetRecentActivity(int userId, int limit = 10)
        {
            var results = await _activityService.GetRecentByUserAsync(userId, limit);
            return Ok(results);
        }

        [Authorize]
        [HttpGet("{userId}/stats")]
        public async Task<IActionResult> GetUserStats(int userId)
        {
            var stats = await _userService.GetUserStatsAsync(userId);
            return Ok(stats);
        }

        

    }
}

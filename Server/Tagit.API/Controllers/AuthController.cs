using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tagit.API.PostModels;
using Tagit.Core.Entities;
using Tagit.Core.Services;

namespace Tagit.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IOAuthService _oAuthService;
        private readonly IJwtService _jwtService;
        private readonly IMapper _mapper;
        private readonly IAuthService _authService;

        public AuthController(IOAuthService oAuthService, IJwtService jwtService, IMapper mapper, IAuthService authService)
        {
            _oAuthService = oAuthService;
            _jwtService = jwtService;
            _mapper = mapper;
            _authService = authService;
        }

        [Authorize]
        [HttpPost("oauth-login")]
        public async Task<IActionResult> OAuthLogin([FromBody] OAuthLoginRequest request)
        {
            var firebaseUser = await _oAuthService.VerifyFirebaseTokenAsync(request.AccessToken);
            if (firebaseUser == null)
                return Unauthorized("Invalid Firebase token");

            var user = await _oAuthService.FindOrCreateUserAsync(firebaseUser);
            if (user == null)
                return StatusCode(500, "Failed to create or fetch user");

            var token = _jwtService.GenerateJwtToken(_mapper.Map<User>(user));

            return Ok(new AuthResponse
            {
                Token = token,
                User = user
            });
        }

        [Authorize]
        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] string email)
        {
            var link = await _authService.RequestPasswordResetAsync(email);
            return Ok(new { resetLink = link }); 
        }

        [Authorize]
        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordPostModel dto)
        {
            var result = await _authService.ResetPasswordAsync(dto.Token, dto.NewPassword);
            if (!result) return BadRequest("Invalid or expired token");
            return Ok("Password reset successfully");
        }
    }
}

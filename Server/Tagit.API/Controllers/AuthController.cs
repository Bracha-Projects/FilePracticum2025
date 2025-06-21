using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tagit.API.PostModels;
using Tagit.Core.Entities;
using Tagit.Core.Models;
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
        private readonly IEmailService _emailService;

        public AuthController(IOAuthService oAuthService, IJwtService jwtService, IMapper mapper, IAuthService authService, IEmailService emailService)
        {
            _oAuthService = oAuthService;
            _jwtService = jwtService;
            _mapper = mapper;
            _authService = authService;
            _emailService = emailService;
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

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] string email)
        {
            var link = await _authService.RequestPasswordResetAsync(email);
            var emailRequest = new EmailRequest
            {
                To = email,
                Subject = "Reset your password",
                Body = $"Please reset your password by clicking the following link: {link}"
            };

            bool emailSent = await _emailService.SendEmailAsync(emailRequest);

            if (emailSent)
                return Ok(new { message = "Reset link sent to your email." });
            else
                return Ok(new { resetLink = link }); 
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordPostModel dto)
        {
            var result = await _authService.ResetPasswordAsync(dto.Token, dto.NewPassword);
            if (!result) return BadRequest("Invalid or expired token");
            return Ok("Password reset successfully");
        }
    }
}

using AutoMapper;
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

        public AuthController(IOAuthService oAuthService, IJwtService jwtService, IMapper mapper)
        {
            _oAuthService = oAuthService;
            _jwtService = jwtService;
            _mapper = mapper;
        }

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
    }
}

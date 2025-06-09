using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
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
        IConfiguration _config;
        public AuthController(IOAuthService oAuthService, IJwtService jwtService, IMapper mapper, IConfiguration config)
        {
            _oAuthService = oAuthService;
            _jwtService = jwtService;
            _mapper = mapper;
            _config = config;
        }

        [HttpPost("oauth-login")]
        public async Task<IActionResult> OAuthLogin([FromBody] OAuthLoginRequest request)
        {
            var user = await _oAuthService.ExternalLoginAsync(request.Provider, request.AccessToken);
            if (user == null) return Unauthorized("Invalid token or provider");
            var token = _jwtService.GenerateJwtToken(_mapper.Map<User>(user));
            return Ok(new AuthResponse
            {
                Token = request.AccessToken,
                User = user
            });
        }

        [HttpGet("github/login")]
        public IActionResult GitHubLogin()
        {
            var clientId = _config["OAuth:GitHub:ClientId"];
            var redirectUri = _config["OAuth:GitHub:RedirectUri"];
            var githubUrl = $"https://github.com/login/oauth/authorize?client_id={clientId}&redirect_uri={redirectUri}&scope=user:email";

            return Redirect(githubUrl);
        }

        [HttpGet("github/callback")]
        public async Task<IActionResult> GitHubCallback([FromQuery] string code)
        {
            var token = await _oAuthService.ExchangeGitHubCodeForAccessToken(code);
            var user = await _oAuthService.ExternalLoginAsync("GitHub", token);

            var jwt = _jwtService.GenerateJwtToken(_mapper.Map<User>(user));
            var html = $@"
        <script>
          window.opener.postMessage({{
            token: '{jwt}',
            user: {JsonConvert.SerializeObject(user)}
          }}, '*');
          window.close();
        </script>";
            return Content(html, "text/html");
        }

    }

}

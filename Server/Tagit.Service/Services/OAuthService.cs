using AutoMapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Tagit.Core.DTOs;
using Tagit.Core.Entities;
using Tagit.Core.Repositories;
using Tagit.Core.Services;

namespace Tagit.Service.Services
{
    public class OAuthService : IOAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly HttpClient _httpClient;
        IConfiguration _configuration;

        public OAuthService(IUserRepository userRepository, IMapper mapper, IHttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _httpClient = httpClientFactory.CreateClient();
            _configuration = configuration;
        }

        public async Task<UserDTO> ExternalLoginAsync(string provider, string token)
        {
            string email = null, name = null, providerId = null, imageUrl = null;

            if (provider.ToLower() == "google")
            {
                var response = await _httpClient.GetAsync($"https://oauth2.googleapis.com/tokeninfo?id_token={token}");
                if (!response.IsSuccessStatusCode) return null;

                var payload = JsonSerializer.Deserialize<Dictionary<string, string>>(await response.Content.ReadAsStringAsync());
                email = payload["email"];
                name = payload["name"];
                providerId = payload["sub"];
                imageUrl = payload.ContainsKey("picture") ? payload["picture"] : null;
            }
            else if (provider.ToLower() == "github")
            {
                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
                var response = await _httpClient.GetAsync("https://api.github.com/user");
                _httpClient.DefaultRequestHeaders.UserAgent.Add(new ProductInfoHeaderValue("MyApp", "1.0")); // חובה

                if (!response.IsSuccessStatusCode) return null;

                var payload = JsonSerializer.Deserialize<Dictionary<string, object>>(await response.Content.ReadAsStringAsync());
                providerId = payload["id"].ToString();
                name = payload["name"]?.ToString();
                imageUrl = payload["avatar_url"]?.ToString();

                // צריך עוד קריאה ל-email:
                var emailResp = await _httpClient.GetAsync("https://api.github.com/user/emails");
                var emailData = JsonSerializer.Deserialize<List<Dictionary<string, object>>>(await emailResp.Content.ReadAsStringAsync());
                email = emailData.FirstOrDefault(e => (bool)e["primary"])["email"].ToString();
            }

            var existingUser = await _userRepository.GetByProviderAsync(provider, providerId);
            if (existingUser == null)
            {
                existingUser = new User
                {
                    Email = email,
                    FirstName = name,
                    Provider = provider,
                    ProviderId = providerId,
                    ProfileImageUrl = imageUrl,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };
                await _userRepository.AddAsync(existingUser);
            }

            return _mapper.Map<UserDTO>(existingUser);
        }

        public async Task<string> ExchangeGitHubCodeForAccessToken(string code)
        {
            var clientId = _configuration["OAuth:GitHub:ClientId"];
            var clientSecret = _configuration["OAuth:GitHub:ClientSecret"];
            var redirectUri = _configuration["OAuth:GitHub:RedirectUri"];

            var requestData = new Dictionary<string, string>
        {
            { "client_id", clientId },
            { "client_secret", clientSecret },
            { "code", code },
            { "redirect_uri", redirectUri }
        };

            var request = new HttpRequestMessage(HttpMethod.Post, "https://github.com/login/oauth/access_token")
            {
                Content = new FormUrlEncodedContent(requestData)
            };

            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var response = await _httpClient.SendAsync(request);
            response.EnsureSuccessStatusCode();

            var content = await response.Content.ReadAsStringAsync();
            var json = JsonSerializer.Deserialize<Dictionary<string, string>>(content);

            return json["access_token"];
        }
    }

}

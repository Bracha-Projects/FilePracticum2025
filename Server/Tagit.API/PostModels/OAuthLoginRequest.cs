namespace Tagit.API.PostModels
{
    public class OAuthLoginRequest
    {
            public string Provider { get; set; } // "Google" או "GitHub"
            public string AccessToken { get; set; } // או ID Token ב-Google
       
    }
}

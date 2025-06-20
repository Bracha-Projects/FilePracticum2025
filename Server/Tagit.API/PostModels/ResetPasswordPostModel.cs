namespace Tagit.API.PostModels
{
    public class ResetPasswordPostModel
    {
        public Guid Token { get; set; }
        public string NewPassword { get; set; }
    }
}

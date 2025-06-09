namespace Tagit.API.PostModels
{
    public class ActivityPostModel
    {
        public int UserId { get; set; }
        public string Action { get; set; }
        public string? Metadata { get; set; }
    }
}

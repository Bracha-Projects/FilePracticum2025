namespace Tagit.API.PostModels
{
    public class FolderPostModel
    {
        public string Name { get; set; }
        public int ParentFolderId { get; set; }
        public int OwnerId { get; set; }
    }
}

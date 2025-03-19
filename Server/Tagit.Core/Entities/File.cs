using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tagit.Core.Entities
{
    public class File
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public string FileType { get; set; }
        public int FileSize { get; set; }
        public string StorageUrl { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // connections
        public int UserId { get; set; }
        public User User { get; set; }
        public List<Tag> FileTags { get; set; }
        public File()
        {
            FileTags = new List<Tag>();
        }
    }
}

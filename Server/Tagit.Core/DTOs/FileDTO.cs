using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tagit.Core.DTOs
{
    public class FileDTO
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public string FileType { get; set; }
        public string S3Key { get; set; }
        public int OwnerId { get; set; }
        public DateTime LastModified { get; set; } 
        public DateTime DateCreated { get; set; }
        public int FolderId { get; set; }
        public bool IsDeleted { get; set; } 
        public long Size { get; set; }
        public List<TagDTO> Tags { get; set; }
    }
}

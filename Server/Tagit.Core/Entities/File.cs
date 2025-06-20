using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tagit.Core.Entities
{
    public class File
    {
        public int Id { get; set; } 
        [MaxLength(255)]
        public string FileName { get; set; } 
        [MaxLength(255)]
        public string FileType { get; set; } 
        public long Size { get; set; } 
        [MaxLength(255)]
        public string S3Key { get; set; } 
        public int FolderId { get; set; } 
        public int OwnerId { get; set; } 
        public DateTime LastModified { get; set; } 
        public DateTime DateCreated { get; set; } 
        public bool IsDeleted { get; set; } 
        public Folder Folder { get; set; }
        public User Owner { get; set; }
        public List<Tag> FileTags { get; set; }
        public File()
        {
            FileTags = new List<Tag>();
        }
    }
}

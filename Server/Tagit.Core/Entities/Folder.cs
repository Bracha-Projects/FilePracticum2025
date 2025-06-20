using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tagit.Core.Entities
{
    public class Folder
    {
        public int Id { get; set; } 
        [MaxLength(255)]
        public string Name { get; set; } 
        public int? ParentFolderId { get; set; } 
        public int OwnerId { get; set; } 
        public DateTime CreatedAt { get; set; } 
        public DateTime UpdatedAt { get; set; } 
        public bool IsDeleted { get; set; } 
        

        public User Owner { get; set; }
        public Folder ParentFolder { get; set; }
        public List<Folder> SubFolders { get; set; } // תיקיות־בת
        public List<File> Files { get; set; } // קבצים בתיקיה

        public Folder()
        {
            SubFolders = new List<Folder>();
            Files = new List<File>();
        }
    }
}

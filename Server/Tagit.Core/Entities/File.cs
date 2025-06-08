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
        public int Id { get; set; } // מזהה ייחודי
        [MaxLength(255)]
        public string FileName { get; set; } // שם הקובץ
        [MaxLength(255)]
        public string FileType { get; set; } // סוג הקובץ (pdf, jpg וכו')
        public long Size { get; set; } // גודל הקובץ בבתים
        [MaxLength(255)]
        public string S3Key { get; set; } // מזהה הקובץ ב-S3 (לדוג' uploads/user1/file.jpg)
        public int FolderId { get; set; } // תיקיית היעד (null אם לא משויך לתיקיה)
        public int OwnerId { get; set; } // בעל הקובץ
        public DateTime LastModified { get; set; } // To track when the file was last modified
        public DateTime DateCreated { get; set; } // To track when the file was originally created
        public bool IsDeleted { get; set; } // דגל למחיקה רכה

        // connections
        public Folder Folder { get; set; }
        public User Owner { get; set; }
        public List<Tag> FileTags { get; set; }
        public File()
        {
            FileTags = new List<Tag>();
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tagit.Core.PostModels
{
    public class FilePostModel
    {
        public string FileName { get; set; }
        public string FileType { get; set; }
        public string S3Key { get; set; }
        public int OwnerId { get; set; }
        public int FolderId { get; set; }
        public bool IsDeleted { get; set; } // דגל למחיקה רכה
        public long Size { get; set; }
        public List<string> Tags { get; set; }
    }
}

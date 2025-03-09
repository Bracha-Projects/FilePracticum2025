using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TagIt.Core.PostModels
{
    public class FilePostModel
    {
        public int UserId { get; set; }
        public string FileName { get; set; }
        public string FileType { get; set; }
        public int FileSize { get; set; }
        public string StorageUrl { get; set; }
    }
}

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
        public string StorageUrl { get; set; }
        public int UserId { get; set; }
        public List<string> Tags { get; set; }
    }
}

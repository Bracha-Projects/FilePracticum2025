using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TagIt.Core.Entities
{
    public class FileTag
    {
        public int FileId { get; set; }
        public File File { get; set; }

        public int TagId { get; set; }
        public Tag Tag { get; set; }
    }
}

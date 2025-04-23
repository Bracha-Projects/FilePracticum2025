using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tagit.Core.Entities
{
    public class Tag
    {
        public int Id { get; set; }
        public string TagName { get; set; }

        // connections
        public IEnumerable<File> FileTags { get; set; }
    }
}
